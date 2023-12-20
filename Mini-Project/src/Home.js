import { useState } from "react"
import Navigation from "./Navigation"

function Home()
{
    const [uni,setUni]=useState('');
    const [details,setDetails]=useState({
        fn:'',
        marks:0
    })

    const [cgpa,setCgpa]=useState({
        fn1:'',
        marks:0
    })
    const [cmarks,setCmarks]=useState(
        {
            mark:0,
            calculation:''
        }
    )

    const [rmarks,setRmarks]=useState(
        {
            mark:0,
            calculation:''
        }
    )


const Uni =  (event) =>
{
 setUni(event.target.value);
console.log(uni);
console.log(event.target.value);
}

const main = (event) =>
{
if(event.target.name == 'fn')
{
    setDetails({ ...details, fn: event.target.value });
}
else if(event.target.name == 'fn1')
{
    setCgpa({ ...cgpa, fn1: event.target.value });
}
else if(event.target.name == 'marks'){
    setDetails({ ...details, marks: event.target.value });
}
else if(event.target.name == 'cgpa'){
    setCgpa({ ...cgpa, marks: event.target.value });
}
}

const doCalculation = () =>
{
if(uni == 'Pune University')
{
    setCmarks({...cmarks,mark:(details.marks*8.8).toFixed(2),calculation:`Marks=${details.marks}*8.8=${(details.marks*8.8).toFixed(2)}%`});
    
}
else if(uni == 'Nagpur University')
{
    setCmarks({...cmarks,mark:(details.marks*8.45).toFixed(2),calculation:`Marks=${details.marks}*8.45=${(details.marks*8.45).toFixed(2)}%`});
}
else if(uni == 'Mumbai University')
{
    setCmarks({...cmarks,mark:(details.marks*8.5).toFixed(2),calculation:`Marks=${details.marks}*8.5=${(details.marks*8.5).toFixed(2)}%`});
}
{

}
}

const doRevCalculation = () =>
{
if(uni == 'Pune University')
{
    setRmarks({...rmarks,mark:(cgpa.marks/8.8).toFixed(2),calculation:`Marks=${cgpa.marks}/8.8=${(cgpa.marks/8.8).toFixed(2)}`});
}
else if(uni == 'Nagpur University')
{
    setRmarks({...rmarks,mark:(cgpa.marks/8.45).toFixed(2),calculation:`Marks=${cgpa.marks}/8.45=${(cgpa.marks/8.45).toFixed(2)}`});
}
else if(uni == 'Mumbai University')
{
    setRmarks({...rmarks,mark:(cgpa.marks/8.5).toFixed(2),calculation:`Marks=${cgpa.marks}/8.5=${(cgpa.marks/8.5).toFixed(2)}`});
}
{

}
}
    return (
        <div id="Home">
              
              <header>
                <label for="uni"><h3>Select your University</h3></label>
               <select name="uni" id="sel" onChange={Uni}>
                <option checked>Select</option>
                <option value='Mumbai University'>Mumbai University</option>
                <option  value='Nagpur University'>Nagpur University</option>
                <option value='Pune University'>Pune University</option>
               </select>
               </header>

<div class="maincard">
<div class="card">
            
            <div class="desc">
            <h3>CGPA to Percentage Calculator</h3>
            </div>
          
          <div class="content">
            <t3 class="white-text-with-blue-shadow">{uni}</t3>
          <table class="table">
          <tr>
                <td class="col1">Enter your name</td>
                <td class="col2"><input type="text" name='fn' onChange={main}></input></td>
            </tr>
            <tr>
                <td class="col1">CGPA</td>
                <td class="col2"><input type="number" min="0" max="10" name='marks' onChange={main} ></input></td>
            </tr>
           </table>
          </div>
          <button type="button" onClick={doCalculation} id="btn">Calculate</button>
            <div class="output">
              <h4>Congragulation {details.fn} !!! You got <i>{cmarks.mark}%</i></h4>
              <h3>Calculation:
                {cmarks.calculation}
              </h3>
            </div>
           </div>

           <div class="card">
            
            <div class="desc">
            <h3>Percentage to CGPA Calculator</h3>
            </div>
          
          <div class="content">
            <t3 center class="white-text-with-blue-shadow">{uni}</t3>
          <table class="table">
          <tr>
                <td class="col1">Enter your name</td>
                <td class="col2"><input type="text" name='fn1' onChange={main}></input></td>
            </tr>
            <tr>
                <td class="col1">CGPA</td>
                <td class="col2"><input type="number" min="0" max="10" name='cgpa' onChange={main} ></input></td>
            </tr>
           </table>
          </div>
          <button type="button" onClick={doRevCalculation} id="btn">Calculate</button>
            <div class="output">
            <h4>Congragulation {cgpa.fn1} !!! You got <i>{rmarks.mark}</i></h4>
              <h3>Calculation:
                {rmarks.calculation}
              </h3>
            </div>
           </div>
</div>
            
<footer>
        <p>&copy; 2023 Your Website Name. All rights reserved.</p>
    </footer>
        </div>
    )
}
export default Home