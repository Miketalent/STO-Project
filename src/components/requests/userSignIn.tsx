import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function UserSignIn() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const { handleSubmit, register } = useForm({
    mode: 'onSubmit',
  });
 
  const executeSignInForm = async (formData) => {
    const {useremail, userpass} = formData

    setEmail(useremail)
    setPass(userpass)

    await fetch('http://backend.dev2/api-docs/users/signin', {
        method: 'POST',
        body: JSON.stringify({
          email: email,
          password: pass,
        }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
    });

  }

  return (
  <>
    <>
      <form onSubmit={handleSubmit(executeSignInForm)}>
        <input {...register('useremail')} type="text" name="useremail" placeholder='Enter valid email address' />
        <input {...register('userpass')} type="text" name="userpass" placeholder='Enter password'/>
        <br/>
        <button type="submit">Sign In</button>
      </form>
    </>
  </>)
}