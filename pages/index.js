import Layout from '../components/layout'
import Navbar from '../components/navbar'


export default function Index() {
  return (
 <>ok</>
  )
}

Index.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  )
}
