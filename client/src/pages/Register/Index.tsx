import { FormTypeEnums } from "../../interface/form";
import { Form } from "../../components/Form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { register } from "../../api/user";

const REGISTER_FIELDS = [
  {
    name: 'name',
    label: '姓名',
    type: FormTypeEnums.Text,
    required: true
  },
  {
    name: 'inviteCode',
    label: '邀请码',
    type: FormTypeEnums.Text,
    disabled: true
  }
];

const RegisterPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const inviteCode = searchParams.get('inviteCode') || '';
  
  const initialValues = {
    inviteCode
  };

  const handleRegister = async (values: Record<string, string>) => {
    try {
      await register({
        name: values.name,
        inviteCode: values.inviteCode
      });
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-[50vw] max-w-[600px] min-w-[400px]">
        <h1 className="text-2xl font-bold text-center mb-10">注册账号</h1>
        <Form
          className="p-10"
          fields={REGISTER_FIELDS}
          actionName="注册"
          onSubmit={handleRegister}
          initialValues={initialValues}
        />
      </div>
    </div>
  );
};

export default RegisterPage;