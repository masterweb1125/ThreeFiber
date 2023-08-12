import React from 'react'
import { Search as SearchIcon } from 'react-feather'
import styled from 'styled-components'

const InputSearchBar = styled.div`
    background: #ffffff;
    border: 1px solid #CAD1DC;
    border-radius: 3px
`;

export default function SearchInput({ term, search }: any) {
    return (
        <InputSearchBar className="relative rounded w-full sm:max-w-xl md:max-w-sm mt-2">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon size={16} />
            </div>

            <input
                className="py-2 pl-10 pr-4 text-black rounded w-full focus:outline-none focus:ring border-0 italic font-medium"
                // onChange={e => search(e.target.value)}
                style={{ background: 'transparent' }}
                // value={term}
                placeholder="Search Options"
            />
        </InputSearchBar>
    )
}
