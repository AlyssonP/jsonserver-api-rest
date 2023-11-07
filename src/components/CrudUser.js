import React, { useState, useEffect } from "react"
import Form from "./Form"
import Table from "./Table"

// importando httpHelper que contém os métodos para consumir a api
import { httpHelper } from "../helpers/httpHelper"

const CrudUser = () => {
	// Declarando a variavel que receberar os dados de usuarios e sua função de atualização.
	const [users, setUsers] = useState(null) 

	const url = "http://localhost:5000/users" // URL da api.
	const api = httpHelper()

	// Quando houver carregamento da página ele o "useEffect" chama a função "getUsers" para pegar os usuarios cadastrado na api.
	useEffect(() => {
		getUsers()
	}, [])

	// Função para cadastrar usuário.
	const postUser = user => {
		api
			.post(`${url}`, { body: user })
			.then(res => getUsers())
			.catch(err => console.log(err))
	}

	// Função para atualizar dados do usuário.
	const updateUser = (id, user) => {
		api
			.put(`${url}/${id}`, { body: user })
			.then(res => getUsers())
			.catch(err => console.log(err))
	}

	// Função para deletar usuário.
	const deleteUser = id => {
		api
			.del(`${url}/${id}`, {})
			.then(res => getUsers())
			.catch(err => console.log(err))
	}

	// Função para pegar todos os usuário cadastrado na api.
	const getUsers = () => {
		api
			.get(`${url}?_expand=companies`)
			.then(res => {
				setUsers(res)
			})
			.catch(err => console.log(err))
	}

	// O "if" abaixo evita renderizar o componente "CrudUser" até que os dados da API tenham sido carregados com sucesso.
	if (!users) return null

	return (
		<>
			<h3>New user</h3>
			{/* 
			Componente de Formulário para cadstramento de usuário. 
			Está recebendo como atributo(props) um método para cadastraento de Usuário na API.
			*/}
			<Form postUser={postUser} />
			<div className='all-users'>
				<h3>All users</h3>
				{/* Componente Table e esta pasando os atributos (props) que ele precisa. */}
				<Table
					users={users}
					setUsers={setUsers}
					postUser={postUser}
					updateUser={updateUser}
					deleteUser={deleteUser}
				/>
			</div>
		</>
	)
}

export default CrudUser
