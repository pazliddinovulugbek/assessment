import React, { useState } from 'react'
import '../css/index.css'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

function Assess() {

  const [name, setName] = useState("")
  const [people, setPeople] = useState([])

  const addPerson = () => {
    if (name.trim() === "") return;
    setPeople([...people, { fullName: name, score: 0 }])
    setName("")
  }

  const handleScoreChange = (index, score) => {
    const updated = [...people]
    updated[index].score = Number(score)
    setPeople(updated)
  }

  const getResul = (score) => {
    if (score >= 8) return "A'lo";
    if (score >= 7) return "Yaxshi";
    if (score >= 5) return "Qoniqarli";
    return "Qoniqarsiz"
  }

  const downloadPDF = () => {
    const table = document.querySelector("#myTable");

    html2canvas(table).then(canvas => {
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("students-table.pdf");
    });
  }

  return (
    <>
      <main>
        <div className="head_section">
          <div className="one_head_section">
            <input 
              type="text" 
              placeholder='Person Add' 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
            />
            <div className="btn_cart">
              <button onClick={addPerson}>ADD</button>

              <button onClick={downloadPDF}>Download</button>
            </div>
          </div>

          <table id="myTable">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Score</th>
                <th>Result</th>
              </tr>
            </thead>

            <tbody>
              {people.map((person, index) => (
                <tr key={index}>
                  <td>{person.fullName}</td>
                  <td>
                    <select 
                      value={person.score} 
                      onChange={(e) => handleScoreChange(index, e.target.value)}
                    >
                      {[...Array(11)].map((_, i) => (
                        <option key={i} value={i}>{i}</option>
                      ))}
                    </select>
                  </td>
                  <td>{getResul(person.score)}</td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>

      </main>
    </>
  )
}

export default Assess
