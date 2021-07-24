import { gql } from '@apollo/client'
import { GetServerSideProps } from 'next'
import client from '../../../apollo-client'
import Layout from '../../components/Layout'
import { useContext } from 'react'
import { LaunchContext } from '../../contexts/LaunchContext'
import { useEffect } from 'react'
import LaunchDetailHeader from '../../components/LaunchDetailHeader'
import LaunchDetail from '../../components/LaunchDetail'

export default function Launch({ launch }) {
  const [launchData, setLaunchData] = useContext(LaunchContext)

  useEffect(()=>{
    setLaunchData(launch)
  }, [launch])

	return (
		<Layout title={launch.mission_name}>
			<div className='max-w-screen-xl px-5 py-5 bg-black text-white mx-auto'>
				<LaunchDetailHeader/>
				<LaunchDetail/>
			</div>
		</Layout>
	)
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
	const id = query.id

	const { data } = await client.query({
		query: gql`
			query GetLaunchById {
				launch(id: "${id}") {
          id
          mission_name
          details
          launch_date_utc
          launch_success
          links {
            article_link
            video_link
            flickr_images
          }
          rocket {
            rocket {
              description
              company
              country
              height {
                meters
              }
              diameter {
                meters
              }
            }
            rocket_name
            rocket_type
          }
        }
			}
		`,
	})
  console.log(data)

  if(!data || !data.launch){
    return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		}
  }

	return {
		props: {
			launch: data.launch,
		},
	}
}
