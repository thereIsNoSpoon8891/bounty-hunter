import { useState } from "react"
import logo from "../images/bountyCrest.jpg"
import logo2 from "../images/bountyHelm.png"

function BountyForm (props) {

    const {handleBounties, btnText, toggle, save, id } = props


    const template = {
        firstName:  "",
        lastName:  "",
        living: "",
        type:  "",
        amount:  "",
        imageUrl:  ""
    }

const [inputs, setInputs ] = useState(template)

function handleChange (e) {
    
    const {name, value} = e.target
    setInputs(prevInputs => {
        return{...prevInputs, [name]: value}
    })

}

function handleSubmit (e) {
    e.preventDefault()
    console.log("test")
            // post request
        if(btnText === "Add Bounty"){
            handleBounties(inputs)
            setInputs(template)
        } else if (btnText === "Save"){
            // put request
            toggle();
            save(id, inputs)
        }

}
console.log(inputs)

    return(
        <div className="bounty-form-container">
            {/* <img width="400px" src={logo} /> */}
            <div className="bounty-inputs-container">
                <form  >
                    <input 
                    name="firstName"
                    type="text"
                    value={inputs.firstName}
                    placeholder="First Name"
                    onChange={handleChange}
                    />

                    <input 
                    name="lastName"
                    type="text"
                    value={inputs.lastName}
                    placeholder="Last Name"
                    onChange={handleChange}
                    />

                    <input 
                    name="living"
                    type="text"
                    value={inputs.living}
                    placeholder="Bounty Status"
                    onChange={handleChange}
                    /> 

                     <input 
                    name="type"
                    type="text"
                    value={inputs.type}
                    placeholder="Force Affinity"
                    onChange={handleChange}
                    /> 

                    <input 
                    className="amount-input"
                    name="amount"
                    type="number"
                    value={inputs.amount}
                    placeholder="Bounty Amount"
                    onChange={handleChange}
                    />

                    <input 
                    name="imageUrl"
                    value={inputs.imageUrl}
                    placeholder="Image URL"
                    onChange={handleChange}
                    />

                </form>
            </div>
                    <button 
                    onClick={handleSubmit}
                    className="form-button"
                    >
                        {btnText}
                    </button>
            {/* <img width="400px" className="helm" src={logo2}/> */}
        </div>
    )
}

export default BountyForm