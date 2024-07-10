import Quote from "../components/Quote"
import SignupForm from "../components/SignupForm"

const Signup = () => {
  return (
    <>
      <div className="grid grid-cols-2">
        <SignupForm/>
        <div className="invisible lg:visible">
          <Quote/>
        </div>
      </div>
    </>
  )
}

export default Signup