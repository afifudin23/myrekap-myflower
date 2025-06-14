import { useForm } from "react-hook-form";
import AuthForm from "../components/organisms/AuthForm";
import AuthTemplate from "../components/templates/AuthTemplate";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema, type LoginFormType } from "../schemas/AuthSchema";
import { LOGIN_FIELDS } from "../constants/AuthConstant";

function Login() {
    const register,
        handleSubmit,
        formState: { errors } = useForm<LoginFormType>({
            resolver: zodResolver(loginFormSchema),
        });
    const onSubmit = () => {};
    return (
        <AuthTemplate>
            <AuthForm fields={LOGIN_FIELDS} register={register} onSubmit={handleSubmit(onSubmit)} errors={errors} />
        </AuthTemplate>
    );
}
export default Login;
