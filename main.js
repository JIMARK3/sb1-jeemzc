// Tab switching functionality
const tabs = document.querySelectorAll('.tab');
const editors = document.querySelectorAll('.code-editor');
const runButton = document.getElementById('run-btn');
const preview = document.getElementById('preview');

// Default content
const defaultHTML = `<div class="container">
  <h1>Welcome!</h1>
  <p>Start editing to see your changes</p>
  <button onclick="showMessage()">Click me!</button>
</div>`;

const defaultCSS = `.container {
  text-align: center;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  color: #0078d4;
}

button {
  padding: 10px 20px;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}`;

const defaultJS = `function showMessage() {
  alert('Hello from the editor!');
}`;

// Set default content
document.getElementById('html-editor').value = defaultHTML;
document.getElementById('css-editor').value = defaultCSS;
document.getElementById('js-editor').value = defaultJS;

// Tab switching
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const panel = tab.dataset.panel;
    
    // Update active tab
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    
    // Show active editor
    editors.forEach(editor => {
      editor.classList.remove('active');
      if (editor.id === `${panel}-editor`) {
        editor.classList.add('active');
      }
    });
  });
});

// Run code function
function updatePreview() {
  const html = document.getElementById('html-editor').value;
  const css = document.getElementById('css-editor').value;
  const js = document.getElementById('js-editor').value;

  const previewContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>${css}</style>
      </head>
      <body>
        ${html}
        <script>${js}</script>
      </body>
    </html>
  `;

  const previewDocument = preview.contentDocument;
  previewDocument.open();
  previewDocument.write(previewContent);
  previewDocument.close();
}

// Run button click handler
runButton.addEventListener('click', updatePreview);

// Initial preview
updatePreview();

// Auto-run on input (with debounce)
let timeout;
function debounce(func, wait) {
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

const debouncedUpdate = debounce(updatePreview, 1000);

document.getElementById('html-editor').addEventListener('input', debouncedUpdate);
document.getElementById('css-editor').addEventListener('input', debouncedUpdate);
document.getElementById('js-editor').addEventListener('input', debouncedUpdate);