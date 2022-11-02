import PageWithForm from '../PageWithForm/PageWithForm';
import './Login.css';

export default function Login({ onSubmit, message, ...props }) {
  return (
    <section className='login'>
      <PageWithForm
        title='Вход'
        btnText='Дальше'
        formName='login'
        inputId='current-password'
        linkTo='/signup'
        linkToRecovery='/recoveryPass'
        underBtnText='Или'
        linkText='зарегистрироваться'
        linkToRecoveryText='Забыли пароль?'
        recoveryLinkText='Восстановить'
        onSubmit={onSubmit}
        message={message}
      ></PageWithForm>
    </section>
  );
}
