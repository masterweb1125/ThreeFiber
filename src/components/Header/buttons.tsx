import { DocumentAddSolid, SaveSolid, ShareSolid, TrashSolid, DownloadSolid, BookOpenSolid } from '@graywolfai/react-heroicons'

export const HeaderButtons = () => {
    return (
        <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-300" />
            </div>

            <div className="relative flex justify-center">
                <span className="relative z-0 inline-flex shadow-sm rounded-md -space-x-px">
                    <button type="button" className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-400 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
                        <span className="sr-only">Edit</span>
                        <DocumentAddSolid className="h-5 w-5" aria-hidden="true" />
                    </button>

                    <button type="button" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-400 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
                        <span className="sr-only">Attachment</span>
                        <SaveSolid className="h-5 w-5" aria-hidden="true" />
                    </button>

                    <button type="button" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-400 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
                        <span className="sr-only">Annotate</span>
                        <ShareSolid className="h-5 w-5" aria-hidden="true" />
                    </button>

                    <button type="button" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-400 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
                        <span className="sr-only">Delete</span>
                        <TrashSolid className="h-5 w-5" aria-hidden="true" />
                    </button>

                    <button type="button" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-400 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
                        <span className="sr-only">Delete</span>
                        <DownloadSolid className="h-5 w-5" aria-hidden="true" />
                    </button>

                    <button type="button" className="relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-400 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
                        <span className="sr-only">Help</span>
                        <BookOpenSolid className="h-5 w-5" aria-hidden="true" />
                    </button>
                </span>
            </div>
        </div>
    )
}

export default HeaderButtons