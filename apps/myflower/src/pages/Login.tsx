import AuthForm from "../components/organisms/AuthForm";
import AuthTemplate from "../components/templates/AuthTemplate";

function Login() {
    return (
        <AuthTemplate>
            <AuthForm children={<h1>Login</h1>} />
        </AuthTemplate>
    );
}
export default Login;
