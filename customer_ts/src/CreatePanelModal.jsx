import {useState} from "react";

export function CreatePanelModal({onClose}) {
    const [data, setData] = useState('');

    function handleChange(e) {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const submitForm = () => {
        fetch(`http://reachhold.com:8080/dashboard/panel?host=${data['host']}&version=${data['version']}&adminVersion=${data['adminVersion']}&name=${data['name']}&deploy=false`, {
            method: 'POST',
            headers: new Headers({
                'Authorization': 'Basic ' + btoa('dashboard:qwe565656')
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log('Данные успешно отправлены:', data);
            })
            .then(() => {
                onClose()
            })
            .catch(er => console.error(er));
    };

    function handleBackdropClick(e) {
        if (e.target.classList.contains('hs-overlay')) {
            onClose()
        }
    }

    function handleCloseClick(e) {
        onClose()
    }

    return (
        <div onClick={(e) => handleBackdropClick(e)}
             className="hs-overlay size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto"
             role="dialog"
        >
            <div
                className="mt-7 opacity-100 duration-500 ease-out transition-all w-[400px] m-3 sm:mx-auto">
                <div
                    className="flex flex-col bg-gray-800 shadow-sm rounded-xl pointer-events-auto border border-white-10">
                    <div className="p-4 overflow-y-auto space-y-4">
                        <div>
                            <label htmlFor="input-label"
                                   className="block text-sm font-medium mb-2 ">Name</label>
                            <input id="input-label"
                                   onChange={handleChange}
                                   name='name'
                                   className="py-3 px-4 block w-full bg-gray-700 text-white border-gray-900 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:placeholder-neutral-500 "
                                   placeholder="placeholder" autoFocus/>
                        </div>
                        <div>
                            <label htmlFor="input-host"
                                   className="block text-sm font-medium mb-2 ">Host</label>
                            <input id="input-host"
                                   onChange={handleChange}
                                   name='host'
                                   className="py-3 px-4 block w-full bg-gray-700 text-white border-gray-900 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:placeholder-neutral-500 "
                                   placeholder="placeholder"/>
                        </div>
                        <div>
                            <label htmlFor="input-version"
                                   className="block text-sm font-medium mb-2 ">Version</label>

                            <input name='version' onChange={handleChange}
                                   id="input-version"
                                   className="py-3 px-4 block w-full bg-gray-700 text-white border-gray-900 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:placeholder-neutral-500 "
                                   placeholder="Version"/>
                        </div>
                        <div>
                            <label htmlFor="input-admin-version"
                                   className="block text-sm font-medium mb-2 ">Admin Version</label>
                            <input id="input-admin-version"
                                   onChange={handleChange}
                                   name='adminVersion'
                                   className="py-3 px-4 block w-full bg-gray-700 text-white border-gray-900 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:placeholder-neutral-500 "
                                   placeholder="Admin Version"/>
                        </div>
                    </div>
                    <div className="flex justify-between items-center gap-x-2 py-3 px-4 dark:border-neutral-700">
                        <button
                            onClick={handleCloseClick}
                            type="button"
                            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-white-10 bg-gray-800 text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                            data-hs-overlay="#hs-focus-management-modal">Закрити !!!!! NO
                        </button>
                        <button
                            onClick={submitForm}
                            type="button"
                            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">Створити
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}