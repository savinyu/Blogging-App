import Quote from "../components/Quote"
import SigninForm from "../components/SigninForm"

const Signin = () => {
  return (
    <>
      <div className="grid grid-cols-2">
        <SigninForm/>
        <div className="invisible lg:visible">
          <Quote/>
        </div>
      </div>
    </>
  )
}

export default Signin