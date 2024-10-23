import React ,{useState} from 'react'

function Product() {
  const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	function authenticate (){
		let item={password,email}
		console.warn(item)
	}
	return (
		<div>
			<h1>heolxxclo Product page</h1>
			<input
        type="text"
        placeholder="Confirm your email"
        value={email}
        onChange={(text) => setEmail(text.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Confirm your password"
        value={password}
        onChange={(text) => setPassword(text.target.value)}
        required
      />
      
			<button type='submit' onClick={() => authenticate()} className='btn btn-primary'>onClick</button>
		</div>
	)	
}
export default Product;

