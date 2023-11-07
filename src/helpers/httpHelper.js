export const httpHelper = () => {
	const customFetch = async (url, options = {}) => {
		const defaultMethod = "GET" // Método HTTP padrão que serve para pegar as informações em uma requisição
		const defaultHeaders = {
			"Content-Type": "application/json",
			Accept: "application/json",
		} // Informção a requisição
		const controller = new AbortController() // Instancia o objeto "AbortController" na variavel "controller"
		options.signal = controller.signal
		
		// "options.method" recebe o "options.method" vindo pelo parametro informado se for diferente de NULL, caso sejá NULL ele recebe o objeto "defaultMethod".
		options.method = options.method || defaultMethod 
		// A variavel "options.headers" recebe "{ ...defaultHeaders, ...options.headers }" se contem algo em "options.headers" vindo por parâmetro caso contrario ele receberá o objeto "defaultHeaders"
		options.headers = options.headers
			? { ...defaultHeaders, ...options.headers }
			: defaultHeaders

		// "options.body" recebe o body da requisição que vem por parametro "options" se tiver algo no atributo body caso contrario options.body recebe false.
		options.body = JSON.stringify(options.body) || false 
		if (!options.body) delete options.body

		setTimeout(() => {
			controller.abort()
		}, 3000)

		try {
			// Faz request usando o método "fetch" passando a url e as opções da requisição, espera ela terminar e armazena na variavel response.
			const response = await fetch(url, options)
			// retorna a reposta a requisição de forma assicrona
			return await response.json()
		} catch (err) {
			// Messagem de erro caso houver algum erro na requisição da api.
			return err
		}
	}

	// Função para pegar os dados da api usando método GET(Padrão da função "customFetch").
	
	const get = (url, options = {}) => customFetch(url, options)

	// Função para criação/cadastramento/adição na api usando método POST.
	const post = (url, options) => {
		options.method = "POST"
		return customFetch(url, options)
	}

	// Função para atualiza um dos objetos da fonte de dados da api usando método PUT.
	const put = (url, options) => {
		options.method = "PUT"
		return customFetch(url, options)
	}

	// Função para deletar um dos objetos da fonte de dados da api usando método DELETE.
	const del = (url, options) => {
		options.method = "DELETE"
		return customFetch(url, options)
	}

	// Todas a funções acima(get, post, put, del) recebem como paramteros a url da API e as opções de entreda que são passado por exemplo o método http para requisoção

	// Retornando as funções get, post, put, del para ser reutilizados quando import o função "httpHelper" em outros arquivos.
	return {
		get,
		post,
		put,
		del,
	}
}
