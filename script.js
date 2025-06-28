document.getElementById("arrestForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;
  const name = form.name.value;
  const crime = form.crime.value;
  const date = form.date.value;
  const officer = form.officer.value;

  const file = form.photo.files[0];
  const imgUrl = file ? URL.createObjectURL(file) : '';

  document.getElementById("result").innerHTML = `
    <div id="capture">
      <h2>ARREST RECORD</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Crime:</strong> ${crime}</p>
      <p><strong>Date of Arrest:</strong> ${date}</p>
      <p><strong>Officer:</strong> ${officer}</p>
      ${imgUrl ? `<img src="${imgUrl}" />` : ''}
    </div>
    <button id="downloadBtn">Download as Image</button>
  `;

  document.getElementById("downloadBtn").addEventListener("click", () => {
    html2canvas(document.getElementById("capture")).then((canvas) => {
      const link = document.createElement("a");
      link.download = "arrest_report.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  });
});
