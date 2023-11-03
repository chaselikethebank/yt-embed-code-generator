import React, { useState } from "react";

function YouTubeEmbedCodeGenerator() {
  const [apiKey, setApiKey] = useState("IzaSyAEePtXyZ16cHL_Hty0xTj5wK8x5mydbfE");
  const [videoUrl, setVideoUrl] = useState("https://www.youtube.com/watch?v=3wEzEip35Pw");
  const [codeSnippet, setCodeSnippet] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);

  const generateCodeSnippet = () => {
    // Extract the video ID from the URL
    const urlParams = new URLSearchParams(new URL(videoUrl).search);
    const videoId = urlParams.get("v");

    if (videoId) {
      const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=player&id=${videoId}&key=${apiKey}`;

      // Generate the code snippet
      const snippet = `
      
      <div id="video-container">
        The YouTube video will be embedded here:
      </div>
      
      <script>
        const apiKey = '${apiKey}';
        const videoUrl = '${videoUrl}';
        
        const urlParams = new URLSearchParams(new URL(videoUrl).search);
        const videoId = urlParams.get('v');
        
        if (videoId) {
          const apiUrl = 'https://www.googleapis.com/youtube/v3/videos?part=player&id=' + videoId + '&key=' + apiKey;
          
          fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
              const playerUrl = data.items[0].player.embedHtml;
              document.getElementById('video-container').innerHTML = playerUrl;
            })
            .catch(error => console.error('Error:', error));
        } else {
          console.error('Invalid video URL');
        }
      </script>`;

      setCodeSnippet(snippet);
    } else {
      console.error("Invalid video URL");
    }
  };

  const handleCopyCode = () => {
    const codeSnippetTextArea = document.getElementById("code-snippet-textarea");
    codeSnippetTextArea.select();
    document.execCommand("copy");
    setCopySuccess(true);
  };

  return (
    <div>
      <h2> Embeded Code Generator for YouTube Player</h2>
      <div>
        <label>API Key:</label>
        <input
          type="text"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value) }
        />
      </div>
      <div>
        <label>Video URL:</label>
        <input
          type="text"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
        />
      </div>
      <button onClick={generateCodeSnippet}>Generate Code</button>
      
      {codeSnippet && (
        <div>
          <h3>Generated Code Snippet:</h3>
          <div className="code-snippet">
            <textarea id="code-snippet-textarea" readOnly value={codeSnippet} />
          </div>
          {copySuccess ? (
            <p>Code snippet copied to clipboard!</p>
          ) : (
            <button onClick={handleCopyCode}>Copy Code</button>
          )}
        </div>
      )}
    </div>
  );
}

export default YouTubeEmbedCodeGenerator;
