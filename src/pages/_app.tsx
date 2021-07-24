import '../../styles/globals.css'
import type { AppProps } from 'next/app'
import { LaunchProvider } from '../contexts/LaunchContext'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<LaunchProvider>
			<Head>
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
			</Head>
			<Component {...pageProps} />
		</LaunchProvider>
	)
}
export default MyApp
