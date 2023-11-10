import React, { useState, useEffect } from "react"
import Form from "./Form"
import Table from "./Table"

// importando httpHelper que contém os métodos para consumir a api
import { httpHelper } from "../helpers/httpHelper"

const CrudUser = () => {
	// Declarando a variavel que receberar os dados de usuarios e sua função de atualização.
	const [users, setUsers] = useState(null) 

	const url = "http://localhost:5000/users" // URL da api.
	const api = httpHelper() // Declarando a variavel "api" os comportamentos que contém na função httpHelper, onde pode fazer o consumo de uma API.

	// Quando houver carregamento da página ele o "useEffect" chama a função "getUsers" para pegar os usuarios cadastrado na api.
	useEffect(() => {
		getUsers()
	}, [])

	// Função para cadastrar usuário.
	const postUser = user => {
		api
			.post(`${url}`, { body: user }) // Inserir um novo usuário passando os dados(em objeto json) dele pelo corpo(body) da requisição HTTP para a API RestFul.
			.then(res => getUsers()) // Promessa a ser feita para carregar a lista os usuários depois de inserir um novo usuário.
			.catch(err => console.log(err)) // Retorna no console algum erro se acontecer na requisição.
	}

	// Função para atualizar dados do usuário.
	const updateUser = (id, user) => {
		api
			.put(`${url}/${id}`, { body: user }) // Atualiza os dados do usuário do id informado por parâmetro.
			.then(res => getUsers()) // Promessa a ser feita para pegar a lista os usuários depois de atualizar os dados de um dos usuários.
			.catch(err => console.log(err)) // Retorna no console algum erro se acontecer na requisição.
	}

	// Função para deletar usuário.
	const deleteUser = id => {
		api
			.del(`${url}/${id}`, {}) // Deleta usuário do id informado por parâmetro.
			.then(res => getUsers()) // Promessa a ser feita para pegar a lista os usuários depois de deletar um dos usuários.
			.catch(err => console.log(err)) // Retorna no console algum erro se acontecer na requisição.
	}

	// Função para pegar todos os usuário cadastrado na api.
	const getUsers = () => {
		api
			.get(`${url}?_expand=companies`)
			.then(res => {
				setUsers(res)
			}) // Atualiza os dados do vetor de usuários quando a promessa for comprida.
			.catch(err => console.log(err)) // Retorna so console algum erro se acontecer na requisição.
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
