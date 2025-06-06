import { FormTypeEnums } from "../../interface/form";
import { Form } from "../../components/Form";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/user";
import { useUser } from "../../contexts/UserContext";

const LOGIN_FIELDS = [
  {
    name: 'uid',
    label: 'uid',
    type: FormTypeEnums.Text,
  },
]

const LoginPage  = () => {
  const navigate = useNavigate();
  const { updateUser } = useUser();
  const handleLogin = async (values: Record<string, string>) => {
    try {
      await login(values.uid);
      await updateUser();
      navigate('/dashboard');
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-[50vw] max-w-[600px] min-w-[400px]">
        <h1 className="text-2xl font-bold text-center mb-10">返佣后台系统</h1>
        <Form
          className="p-10"
          fields={LOGIN_FIELDS}
          actionName="登录"
          onSubmit={handleLogin}
          initialValues={{}}
        />
      </div>
    </div>
  )
}

export default LoginPage;