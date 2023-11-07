import { LogoIcon } from "./assets/icons"
import CrudUser from "./components/CrudUser"
import "./styles/App.css"

function App() {
	return (
		<>
		{/* Header da página */}
			<header>
				<div className='header__content'>
					<div className='logo'>
						<LogoIcon />
						<strong>JSON SERVER API</strong>
					</div>
				</div>
			</header>
			{/* Main da página */}
			<main>
				{/* Componente principal da aplicação onde será feito o crud de usuários. */}
				<CrudUser />
			</main>
		</>
	)
}

export default App
