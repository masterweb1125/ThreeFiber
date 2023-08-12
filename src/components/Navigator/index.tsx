import styled from "styled-components"
import { aliCloudCompos, huaweiCloudCompos } from "../../constants/comp"
import DropDown from "../DropDown"
import DraggableItem from "./draggableItem"

const Wrapper = styled.div`
    width: 300px;
    background: #F9FAFB;
    border: 1px solid #E5E5E5;
    padding: 24px 10px;
`

const Container = styled.div`
    padding: 10px 10px;
    border: 1px solid #c0c9e0;
    border-radius: 3px;
    height: 100%;
    overflow: auto;
`

const CaptionTitle = styled.div`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 109.02%;
    color: #7c48ca;
`

export const Navigator = () => {
    return (
        <Wrapper className="h-full mt-1">
            <Container className="relative">
                <CaptionTitle className="p-2">
                    Components Categories
                </CaptionTitle>

                <DropDown title={'AliCloud'}>
                    <div className="flex items-center flex-wrap">
                        { aliCloudCompos.map((item: any, index: number) => (
                            <DraggableItem item={item} key={`ali${index}`} />
                        )) }
                    </div>
                </DropDown>

                <DropDown title={'HuaweiCloud'}>
                    <div className="flex items-center flex-wrap">
                        { huaweiCloudCompos.map((item: any, index: number) => (
                            <DraggableItem item={item} key={`huaweicloud${index}`} />
                        )) }
                    </div>
                </DropDown>
            </Container>
        </Wrapper>
    )
}