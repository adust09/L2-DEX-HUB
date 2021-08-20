export default function Layout({ children }) {
    return (
        <>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0-2/js/all.min.js"></script>
            <header class="text-gray-100 bg-gray-900 body-font shadow w-full">
                <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                    <nav class="flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto">
                        <a class="mr-5 hover:text-gray-900 cursor-pointer border-b border-transparent hover:border-indigo-600">Home</a>
                    </nav>
                    <a
                        class="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center lg:items-center lg:justify-center mb-4 md:mb-0">
                        <span class="ml-3 text-xl">L2 DEX HUB</span>
                    </a>
                    <div class="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0">
                        <a href="https://www.buymeacoffee.com/pazlydev" class="bg-indigo-700 hover:bg-indigo-500 text-white ml-4 py-2 px-3 rounded-lg">
                            Connect Wallet
                        </a>
                    </div>
                </div>
            </header>
        </>
    )
}