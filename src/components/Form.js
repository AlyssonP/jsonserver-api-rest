import React, { useState } from "react"
import DropComapies from "./DropCompanies"

const Form = ({ userData = {}, postUser, updateUser }) => {
	// Inicia a variavel user com os dados do props "userData" mas se ele estiver vazio ele inicia o objeto user com os atributos recebendo um string vazia.
	const [user, setUser] = useState({
		name: userData.name ?? "",
		username: userData.username ?? "",
		email: userData.email ?? "",
		phone: userData.phone ?? "",
		companiesId: userData.companiesId ?? "0",
	})

	// Função responsável para armazenas os dado de um usúario em "user", sendo chamado quando for digitado algo em alguns dos "inputs do formulário."
	const handleValue = e => {
		setUser({ ...user, [e.target.name]: e.target.value })
	}

	// Função responsável para criar usuário ou atualizar dados dele quando submeter o formulário.
	const submitUser = e => {
		e.preventDefault()

		// Se no select for selecionado a primeira opção não será realizado criação ou atualização de usuário.
		if (user.companiesId === "0") return
		// Se for informado o id do usuário serar feito atulização dos dados dele.
		if (userData.id) {
			updateUser(userData.id, user)
		} else { // Se não será feito a criação do usuário.
			postUser(user)
		}
	}

	return (
		// Formulário
		<form onSubmit={submitUser} className='row'>
			<input
				type='text'
				name='name'
				value={user.name}
				placeholder='Name'
				onChange={e => handleValue(e)}
			/>
			<input
				type='email'
				name='email'
				value={user.email}
				placeholder='Email'
				onChange={e => handleValue(e)}
			/>
			<input
				type='tel'
				name='phone'
				value={user.phone}
				placeholder='Phone (10)'
				pattern='[0-9]{10}'
				onChange={e => handleValue(e)}
			/>
			{/* Select que contem uma lista de empresas para ser selecionado */}
			<DropComapies companiesId={user.companiesId} handleValue={handleValue} />
			<input
				className='btn-submit'
				type='submit'
				value={`${!userData.id ? "Add new user" : "Save user"}`}
			/>
		</form>
	)
}

export default Form
