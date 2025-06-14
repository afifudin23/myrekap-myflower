import AuthForm from "../components/organisms/AuthForm";
import AuthTemplate from "../components/templates/AuthTemplate";

function Register() {
    return (
        <AuthTemplate>
            <AuthForm children={<h1>Register</h1>} />
        </AuthTemplate>
    );
}

export default Register;
