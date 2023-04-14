import { AppProps } from 'next/dist/shared/lib/router/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function SetIssuedTxHash() {
  const [txHash, setTxHash] = useState();

  const { handleSubmit, register } = useForm({
    mode: 'onSubmit',
  });
 
  const executeSetIssuedTxHash = (formData) => {
    const {hash} = formData

    setTxHash(hash)

    //TODO: Call setTxHashRequest here
  }

  return (
  <>
    <>
      <form onSubmit={handleSubmit(executeSetIssuedTxHash)}>
        <input {...register('hash')} type="text" name="hash" placeholder='Enter tx hash' />
        <br/>
        <button type="submit">Set Transaction Hash</button>
      </form>
    </>
  </>)
}
