import React from "react"
import Form from "./Form"

const Table = ({ users, postUser, updateUser, deleteUser }) => {
	// Função para mostrar um formulário personalizado para a linha do usuário.
	const showUpdateUser = id => {
		const form = document.getElementsByClassName(`show-form-${id}`)
		form[0].classList.toggle("hide-form")
	}

	// Componente interno para linha da tabela.
	const Row = ({ user }) => {
		return (
			<>
				<div className='row'>
					<div>{user.name}</div>
					<div>{user.email}</div>
					<div>{user.phone}</div>
					<div>{user.companies.name}</div>
					<div className='buttons'>
						{/* Botões para ações de atualização e delete do usuário. */}
						<button onClick={() => showUpdateUser(user.id)}>Update</button>
						<button onClick={() => deleteUser(user.id)}>Delete</button>
					</div>
				</div>
				{/* 
					Formulário para atualização dos dados do usuário.
					Esse formuláro aparecerá na página quando a função "showUpdateUser" for chamada.
				*/}
				<div className={`hide-form show-form-${user.id}`}>
					<Form userData={user} postUser={postUser} updateUser={updateUser} />
				</div>
			</>
		)
	}

	return (
		<div className='table'>
			<div className='titles'>
				<div>Name</div>
				<div>Email</div>
				<div>Phone</div>
				<div>Company</div>
				<div>Actions</div>
			</div>
			<div className='rows'>
				{/* Iterar todos os dados que contém em "users" e adiciona o componente interno de linha da tabela, mas faz a iteração se contém dados no vetor. */}
				{users && users.map(u => <Row user={u} key={u.id} />)}
			</div>
		</div>
	)
}

export default Table
