import create from "zustand"
import produce from "immer"
import { cameraTypes } from "../constants"
import { aliCloudCompos, huaweiCloudCompos } from "../constants/comp"

const useStore = create((set) => ({
	dragInfo: {
		isDragging: false,
		type: null
	},
	setDragInfo: (payload: any) => set(produce((state: any) => {
		state.dragInfo = payload
	})),

	objectArray: [] as any,
	updateObjectArray: (payload: any) => set(produce((state: any) => {
		state.objectArray = payload
	})),
	updateObjectByIndex: (payload: any) => set(produce((state: any) => {
		state.objectArray[ payload.index ] = payload.object
	})),
	updateObjectPosByIndex: (payload: any) => set(produce((state: any) => {
		state.objectArray[ payload.index ].pos = payload.pos
	})),
	insertObjectArray: (payload: any) => set(produce((state: any) => {
		state.objectArray.push(payload)
	})),

	focusObject: null as any,
	updateFocusObject: (payload: any) => set(produce((state: any) => {
		state.focusObject = payload
	})),

	focusLine: null as any,
	updateFocusLine: (payload: any) => set(produce((state: any) => {
		state.focusLine = payload
	})),

	lineArray: [] as any,
	updateLineArray: (payload: any) => set(produce((state: any) => {
		state.lineArray = payload
	})),
	updateLineByIndex: (payload: any) => set(produce((state: any) => {
		state.lineArray[ payload.index ] = payload.line
	})),

	cameraType: cameraTypes['Perspective'],
	updateCameraType: (payload: any) => set(produce((state: any) => {
		state.cameraType = payload
	})),
	toggleCameraType: () => set(produce((state: any) => {
		state.cameraType = state.cameraType === cameraTypes['Perspective'] ? cameraTypes['Orthographic'] : cameraTypes['Perspective']
	})),

	componentArray: [
		...aliCloudCompos,
		...huaweiCloudCompos
	] as any,
	updateComponentByIndex: (payload: any) => set(produce((state: any) => {
		state.componentArray[ payload.index ] = payload.value
	})),

	isLoadingModel: true,
	updateIsLoadingModel: (payload: any) => set(produce((state: any) => {
		state.isLoadingModel = payload
	})),

	modalInfo: {
		show: false,
	} as any,
	updateModalInfo: (payload: any) => set(produce((state: any) => {
		state.modalInfo = payload
	})),

	textArray: [] as any,
	insertTextArray: (payload: any) => set(produce((state: any) => {
		state.textArray.push( payload )
	})),
	updateTextByIndex: ({ object, index }: any) => set(produce((state: any) => {
		state.textArray[ index ] = object
	})),

	propsPanelInfo: {
		show: false,
	} as any,
	updatePropsPanelInfo: (payload: any) => set(produce((state: any) => {
		state.propsPanelInfo = payload
	})),

	backColor: '#e9e9e9',
	updateBackColor: (payload: any) => set(produce((state: any) => {
		state.backColor = payload
	})),

	isPreviewMode: false,
	updateIsPreviewMode: (payload: any) => set(produce((state: any) => {
		state.isPreviewMode = payload
	})),
}))

export default useStore
