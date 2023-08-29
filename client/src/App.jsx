import { useEffect, useState } from "react"
import Bounties from "./Bounties"
import BountyForm from "./BountyForm"
import axios from "axios"
import "./app.css"

function App() {

  const [bounties, setBounties] = useState([])

  function getBounties (){
    axios.get("/api/bounties")
      .then(res => setBounties(res.data))
      .catch(error => console.log(error))
  }

  function handleBounties(newBounty) {
    axios.post(`/api/bounties`, newBounty)
      .then(res => setBounties(prevBounties => [...prevBounties, res.data]))
      .catch(err => console.log(err))
  }

  function deleteBounty (id) {
    axios.delete(`/api/bounties/${id}`)
      .then(res => setBounties(prevBounties => prevBounties.filter(bounty => bounty._id !== id)))
      .catch(err => console.log(err))
  }

  function putBounty (bountyId, updatedBounty) {
    axios.put(`/api/bounties/${bountyId}`, updatedBounty)// in the .then() is it more efficient to just call getBounties() ???
      .then(res => setBounties(prevBounties => prevBounties.map(bounty => bounty._id !== bountyId ? bounty : res.data)))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getBounties();
  },[])

  const bountyElements = bounties.map(bounty =>( 
  <Bounties
  key={bounty._id}
  id={bounty._id}
  firstName={bounty.firstName}
  lastName={bounty.lastName}
  alive={bounty.living}
  type={bounty.type}
  reward={bounty.amount}
  image={bounty.imageUrl}
  deleteBounty={deleteBounty}
  save={putBounty}
  />
))



  return (
    <>
      <div className="title">
          <h1 className="title--header">
              Add Bounty
          </h1>
        </div>
        <BountyForm
        handleBounties={handleBounties}
        btnText="Add Bounty"
        save={putBounty}
        key={1}
        />
        {/* <div>
            Display by, Living or Dead Bounties.
            <form name="sort">
                <label for="pick">
                    <select name="pick">
                      <option value= "">
                          -Select-
                      </option>
                      <option value="true">
                          Alive
                      </option>
                      <option value="false">
                        Dead
                      </option>
                    </select>
                </label>
            </form>
        </div> */}
        <div className="bounties-container">
        {bountyElements}
        </div>
    </>
  )
}

export default App
