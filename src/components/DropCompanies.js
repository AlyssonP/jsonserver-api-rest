import React, { useState, useEffect } from "react"
import { httpHelper } from "../helpers/httpHelper"

const DropCompanies = ({ companiesId, handleValue }) => {
	const [companies, setCompanies] = useState(null)
	const [company, setCompany] = useState(companiesId)

	const url = "http://localhost:5000/companies" // URL da api com URL Base e endpoint.
	const api = httpHelper() // Declarando a variavel "api" os comportamentos que contém na função httpHelper, onde pode fazer o consumo de uma API.

	// Carregar os dados para o vetor "companies" quando carregar a página.
	useEffect(() => {
		api
			.get(url)
			.then(res => {
				setCompanies([{ id: 0, name: "Select Company" }, ...res]) // Carrega o primeiro objeto com id 0, e carregar o restante que contém na variável "res".
			})
			.catch(err => console.log(err))
	}, [])

	// O "if" abaixo evita renderizar o componente "DropCompanies" até que os dados da API tenham sido carregados com sucesso.
	if (!companies) return null

	return (
		<select
			name='companiesId'
			value={company}
			onChange={e => {
				setCompany(e.target.value)
				handleValue(e)
			}}
		>
			{/* Itera a lista de "companies" adicionando opção para o select" */}
			{companies.map(c => (
				<option value={c.id} key={c.id}>
					{c.name}
				</option>
			))}
		</select>
	)
}

export default DropCompanies
