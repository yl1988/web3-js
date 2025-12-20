import NavLink from "./nav-link";

export default function NavPc() {
    return <nav className="hidden lg:flex items-center gap-1">
        <NavLink href="/">
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
              <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
            </svg>
            Dashboard
          </span>
        </NavLink>
        <NavLink href="/ethers-function">
          <span className="flex items-center gap-2">
             <svg t="1766210329551" className="w-5 h-5" fill="currentColor" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="20086">
                 <path d="M109.227 157.952c0-20.866 16.902-37.779 37.778-37.779H412.29c20.865 0 37.778 16.903 37.778 37.779v265.284c0 20.866-16.902 37.779-37.778 37.779H147.005c-20.865 0-37.778-16.903-37.778-37.779V157.952z m570.532-50.937c14.752-14.753 38.662-14.763 53.425 0L920.774 294.6c14.749 14.753 14.756 38.667 0 53.426L733.184 535.61c-14.752 14.76-38.663 14.766-53.425 0L492.172 348.027c-14.752-14.753-14.763-38.666 0-53.426l187.587-187.586zM542.88 605.255c0-20.862 16.9-37.775 37.78-37.775h265.28c20.866 0 37.779 16.9 37.779 37.776v265.287c0 20.863-16.9 37.776-37.779 37.776H580.66c-20.867 0-37.78-16.903-37.78-37.776V605.256z m-433.653 0c0-20.862 16.902-37.775 37.778-37.775H412.29c20.865 0 37.778 16.9 37.778 37.776v265.287c0 20.863-16.902 37.776-37.778 37.776H147.005c-20.865 0-37.778-16.903-37.778-37.776V605.256z"  p-id="20087"/>
             </svg>
            Ethers Function
          </span>
        </NavLink>
    </nav>
}