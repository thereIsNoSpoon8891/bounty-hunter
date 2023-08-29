import { useState } from "react"
import BountyForm from "./BountyForm"

function Bounties (props) {

    const [toggleForm, setToggleForm] = useState(false)

    const {firstName, lastName, alive, type, reward, image, id, deleteBounty, save } = props

    function toggleInputs () {
        setToggleForm(prev => !prev)
    }


    return(
        <div className="bounty">
            <h1 className="wanted">WANTED! </h1>

            <h2 className="doa">Dead or Alive!</h2>

            <h2 className="name"> {firstName} {lastName}</h2>

            {alive ? <h3 className="atLarge"> At Large</h3> : <h3 className="killed"> Killed</h3>}

            <h3 className={type === "jedi" ? "jedi" : "sith"}>{type}</h3>

            {alive ? <h3>Credits: {reward}</h3> : <h3>CLAIMED</h3>}

            <img className="poster-image" width="400px" src={image}/>
            {!toggleForm && <button 

            className="delete-button"
            onClick={()=> deleteBounty(id)}
            >
                Delete Bounty
            </button>}

            {!toggleForm && 
            <button 
            className="form-button" 
            onClick={()=> setToggleForm(prev => !prev)}
            >Edit Bounty
            </button>}

            {toggleForm && <div className="bounty--editing-container">
                <BountyForm
                  key={id}
                  id={id}
                  firstName={firstName}
                  lastName={lastName}
                  alive={alive}
                  type={type}
                  reward={reward}
                  image={image}
                  btnText="Save"
                  toggle={toggleInputs}
                  save={save}
                />
                <button
                className="form-edit-cancel-button"
                onClick={()=> setToggleForm(prev => !prev)}
                >Cancel Edit</button>
            </div>}

        </div>
    )
}

export default Bounties