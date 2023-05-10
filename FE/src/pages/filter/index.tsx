


export function Filter(filtered){

    return filtered
}


getServerSideProps(context) {
    const {param } = context
    const filteredJobs = axios(`url/products?${param}`)
    return {
        props: {
            filtered:filtered
        }
    }
}