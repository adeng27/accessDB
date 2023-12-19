export const ResourceCard = (props: {name: string | undefined, description: string | undefined, benefit: string | undefined}) => {
    return (
        <div>
            <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{props.name ? props.name : "Something went wrong"}</h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">{props.description ? props.description : "Something went wrong"}</p>
                <p className="font-extrabold text-gray-700 dark:text-gray-400">{props.benefit ? props.benefit : "Something went wrong"}</p>
            </a>
        </div>
    )
}