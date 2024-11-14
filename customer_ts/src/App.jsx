import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import "preline/preline";
function App() {
  const location = useLocation();
  const [panels, setPanels] = useState('');
  const [formData, setFormData] = useState({ version: '' });

  useEffect(() => {
    fetch('http://reachhold.com:8080/panelEntities?page=0&size=100', {
      method: 'GET',
      headers: new Headers({
        'Authorization': 'Basic ' + btoa('dashboard:qwe565656')
      })
    })
      .then(response => response.json())
      .then(data => setPanels(data))
      .catch(er => console.log(er))
  }, [])

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.version]: e.target.value });
  };

  const submitForm = () => {
    fetch('http://reachhold.com:8080/dashboard/panel?host=panel.reachhold.com&version=0.0.15&adminVersion=0.0.15&name=%D1%82%D0%B5%D1%81%D1%82&deploy=false', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Данные успешно отправлены:', data);
      })
      .catch(er => console.error(er));
  };

  const getData = () => {
    fetch('http://reachhold.com:8080/panelEntities?page=0&size=100', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(data => {
        console.log('Полученные данные:', setFormData(data));
      })
      .catch(er => console.error(er));
  };

  useEffect(() => {
    if (window.HSStaticMethods) {
      window.HSStaticMethods.autoInit(); // Автоматическая инициализация Preline. В функции useEffect добавлена проверка на существование window.HSStaticMethods, чтобы избежать ошибок, если этот объект не определён. Это улучшает безопасность кода.
    }
  }, [location.pathname]);

  return (
    <div className="bg-gray-900 text-white">
      {/* Header */}
      <header className="container bg-gray-800 mx-auto rounded-md px-3 mt-6">
        <div className="mx-auto max-w-7xl px-2">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex items-center space-x-2">
              <img src="/img/mdimg.jpg" alt="Logo" className="w-10 h-10 rounded-md" />
              <h1 className="text-white pl-3">Админка Админок</h1>
            </div>
            {/* Search */}
            <div>
              <input type="text" className="py-2 px-20 rounded-lg bg-gray-900" placeholder="Пошук" readOnly />
            </div>
            {/* Button */}
            <div className="relative ml-3">
              <div>
                <button type="button"
                  className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none" aria-haspopup="dialog" aria-expanded="false" aria-controls="hs-focus-management-modal"
                  data-hs-overlay="#hs-focus-management-modal">+ Створити</button>
                {/* Modal */}
                <div id="hs-focus-management-modal" className="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none" role="dialog" tabIndex="-1" aria-labelledby="hs-focus-management-modal-label">
                  <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all w-[400px] m-3 sm:mx-auto">
                    <div className="flex flex-col bg-gray-800 shadow-sm rounded-xl pointer-events-auto border border-white-10">
                      <div className="p-4 overflow-y-auto space-y-4">
                        <div>
                          <label htmlFor="input-label" className="block text-sm font-medium mb-2 dark:text-black">Name</label>
                          <input type="email" id="input-label" className="py-3 px-4 block w-full bg-gray-700 text-white border-gray-900 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:placeholder-neutral-500 dark:text-neutral-900" placeholder="placeholder" autoFocus />
                        </div>
                        <div>
                          <label htmlFor="input-host" className="block text-sm font-medium mb-2 dark:text-black">Host</label>
                          <input type="email" id="input-host" className="py-3 px-4 block w-full bg-gray-700 text-white border-gray-900 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:placeholder-neutral-500 dark:text-neutral-900" placeholder="placeholder" />
                        </div>
                        <div>
                          <label htmlFor="input-version" className="block text-sm font-medium mb-2 dark:text-black">Version</label>

                          <input name='version' value={formData.version} onChange={handleInputChange}

                            type="email" id="input-version" className="py-3 px-4 block w-full bg-gray-700 text-white border-gray-900 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:placeholder-neutral-500 dark:text-neutral-900" placeholder="Version" />
                        </div>
                        <div>
                          <label htmlFor="input-admin-version" className="block text-sm font-medium mb-2 dark:text-black">Admin Version</label>
                          <input type="email" id="input-admin-version" className="py-3 px-4 block w-full bg-gray-700 text-white border-gray-900 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:placeholder-neutral-500 dark:text-neutral-900" placeholder="Admin Version" />
                        </div>
                      </div>
                      <div className="flex justify-between items-center gap-x-2 py-3 px-4 dark:border-neutral-700">
                        <button onClick={submitForm}
                          type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-white-10 bg-gray-800 text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" data-hs-overlay="#hs-focus-management-modal">Закрити !!!!! NO
                        </button>
                        <button onClick={getData}
                          type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">Створити
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* End of the Modal */}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="pt-4 px-20 mx-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="text-left">
              <th className="p-3">STATUS</th>
              <th className="p-3">URL</th>
              <th className="p-3">VERSION</th>
              <th className="p-3">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {panels && panels['_embedded']['panelEntities'].map(panel => {
              return (
                <tr className="border-b border-gray-700">
                  <td className="p-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                      strokeWidth="1.5" stroke="currentColor" className="size-4 text-green-700">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  </td>
                  {/* id={panel['id']} */}
                  <td className="p-3">{panel['url']}</td>
                  <td className="p-3">{panel['version']}</td>
                  <td className="p-3">
                    <div className="hs-dropdown relative inline-flex">
                      <button id="hs-dropdown-custom-icon-trigger" type="button" className="hs-dropdown-toggle flex justify-center items-center size-9 text-sm font-semibold  text-gray-800 shadow-sm disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-white dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                        aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
                        <svg className="flex-none size-4 text-gray-600 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" /></svg></button>
                      <div className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-40 bg-gray-900 shadow-md rounded-lg mt-2 dark:bg-neutral-800 border border-white" role="menu" aria-orientation="vertical" aria-labelledby="hs-dropdown-custom-icon-trigger">

                        <div className="p-1 space-y-0.5">
                          {/* Кнопка для открытия offcanvas */}
                          <button type="button" className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sx text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700" aria-controls="hs-offcanvas-right" data-hs-overlay="#hs-offcanvas-right">Користувачі</button>
                          <button type="button" className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sx text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700" aria-controls="hs-offcanvas-right" data-hs-overlay="#hs-offcanvas-right">Сайти</button>
                          <button type="button" className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sx text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700" aria-controls="hs-offcanvas-right" data-hs-overlay="#hs-offcanvas-right">Налаштування</button>
                          <button type="button" className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sx text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700" aria-controls="hs-offcanvas-right" data-hs-overlay="#hs-offcanvas-right">Змінити стан</button>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>)
            })}
          </tbody>
        </table>
      </main>

      {/* Offcanvas */}
      <div id="hs-offcanvas-right" className=" bg-gray-900 border border-l-4 border-[rgba(75,85,99,0.5)] hs-overlay hs-overlay-open:translate-x-0 hidden translate-x-full fixed top-0 end-0 transition-all duration-300 transform h-full w-[700px] z-[80] border-s dark:bg-neutral-800 dark:border-neutral-700" role="dialog" tabIndex="-1" aria-labelledby="hs-offcanvas-right-label">
        <div className="p-4 bg-gray-900">
          <div className="container bg-gray-900 mx-auto rounded-md px-3 mt-3">
            <div className="mx-auto max-w-7xl px-2">
              <div className='rounded-lg bg-gray-800'>
                <div className="relative flex justify-between h-16 w-[600px]">
                  <div className="flex items-center space-x-2">
                    <h1 className="text-white pl-3 ml-4">Сайти</h1>
                  </div>
                  <div className='p-3'>
                    <input type="text" className="py-2 px-20 rounded-lg bg-gray-900 w-[450px]" placeholder="Пошук" readOnly />
                  </div>
                </div>
              </div>
              <div className="pt-2 w-full ml-4">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="text-left">
                      <th className="p-3">STATUS</th>
                      <th className="p-3">DOMAIN</th>
                      <th className="p-3">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-700">
                      <td className="p-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 text-green-700">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                      </td>
                      <td className="p-3">stage.reachhold.com</td>
                      <td className="p-3">Змінити стан</td>
                    </tr>
                    <tr className="border-b border-gray-600">
                      <td className="p-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 text-red-700">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                      </td>
                      <td className="p-3">1</td>
                      <td className="p-3">Змінити стан</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* End of the Modal */}
      </div>
    </div>

  );
}

export default App;

