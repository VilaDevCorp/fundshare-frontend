import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { ChangeEventHandler, useEffect, useRef, useState } from "react";
import { useApi } from "../../hooks/useApi";
import { Icon } from "../atom/Icon";
import { useMutation } from "@tanstack/react-query";
import { ApiError } from "../../types/types";
import StatusCode from "status-code-enum";
import { useToast } from "../../hooks/useToast";
import { useError } from "../../hooks/useError";
import { useAuth } from "../../hooks/useAuth";
import { useReactQuery } from "../../hooks/useReactQuery";

export function ProfilePictureModal({
    isOpen,
    onClose
}: {
    isOpen: boolean;
    onClose: () => void;
}) {

    const { user } = useAuth()
    const [profilePicture, setProfilePicture] = useState<File | undefined>(undefined)

    const [preview, setPreview] = useState<string | undefined>(user?.pictureUrl)
    const [previousPhotoDeleted, setPreviousPhotoDeleted] = useState(false)

    const { showToast } = useToast()
    const { setError } = useError()

    const { updateProfilePicture } = useApi()
    const { queryClient } = useReactQuery()

    useEffect(() => {
        if (!profilePicture) {
            if (previousPhotoDeleted) {
                setPreview(undefined)
            }
            return
        }
        const objectUrl = URL.createObjectURL(profilePicture)
        setPreview(objectUrl)

        return () => URL.revokeObjectURL(objectUrl)
    }, [profilePicture, previousPhotoDeleted])



    const { mutate: uploadPicture, isPending: isUploading } = useMutation({
        mutationFn: () => onUploadPicture(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getUserInfo"] })
            onClose()

        },
        onError: (error) => {
            if (error instanceof ApiError) {
                if (error.statusCode === StatusCode.ClientErrorPayloadTooLarge) {
                    showToast('error', 'The image is too large (Max 4.7MB)')
                    return;
                }
                if (error.statusCode === StatusCode.ClientErrorUnsupportedMediaType) {
                    showToast('error', 'Only .png and .jpg files are allowed')
                    return;
                }
            }
            if (error instanceof Error) {
                setError(error);
            }
        }
    })

    const onUploadPicture = async () => {
        await updateProfilePicture(profilePicture)
    }

    const fileInputRef = useRef<HTMLInputElement>(null)

    const onChangePicture: ChangeEventHandler<HTMLInputElement> = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            if (e.target.files[0].size > 5000000) {
                showToast('error', 'The image is too large (Max 4.7MB)')
                return
            }
            if (e.target.files[0].type !== 'image/png' && e.target.files[0].type !== 'image/jpeg') {
                showToast('error', 'Only .png and .jpg files are allowed')
                return
            }
            setProfilePicture(e.target.files[0])
        }
    }

    return (
        isOpen && (
            <Modal isOpen={isOpen} onClose={onClose} size={'md'}>
                <ModalOverlay />
                <ModalContent px={0}>
                    <ModalHeader px={'24px'}>
                        {'Profile picture'}
                        <ModalCloseButton />
                    </ModalHeader>
                    <div className="flex flex-col h-full overflow-auto">
                        <ModalBody
                            display={'flex'}
                            flexDir={'column'}
                            gap={'16px'}
                            pb={'12px'}
                            px={'24px'}
                            w={'100%'}
                        >
                            <input style={{ display: "none" }} type="file" accept="image/png, image/jpeg" ref={fileInputRef} onChange={onChangePicture} />
                            {preview ?
                                <img className="h-full object-contain" src={preview} />
                                :
                                <div className="flex m-auto justify-center items-center bg-neutral-800 rounded-full p-8">
                                    <Icon type={'user'} color={'neutral.0'} fontSize={75} />
                                </div>
                            }
                        </ModalBody>
                        <ModalFooter
                            position={'sticky'}
                            display={'flex'}
                            flexDir={'column'}
                            gap={4}
                            bottom={0}
                            w={'100%'}
                            px={'12px'}
                        >
                            <p className="text-neutral-800">{"Only .png and .jpg files are allowed"}</p>
                            {!preview ?
                                <Button isDisabled={isUploading} style={{ width: '100%' }} variant={'outlined'} onClick={() => fileInputRef.current?.click()}>{"Change picture"}</Button>
                                :
                                <Button variant={"ghost_error"} isDisabled={isUploading} style={{ width: '100%' }} onClick={() => {
                                    setProfilePicture(undefined)
                                    setPreviousPhotoDeleted(true)
                                }}>{"Remove picture"}</Button>
                            }
                            <Button isDisabled={isUploading || (profilePicture === undefined && !previousPhotoDeleted)} style={{ width: '100%' }} onClick={() => uploadPicture()}>{"Save changes"}</Button>
                        </ModalFooter>
                    </div>
                </ModalContent>
            </Modal >

        )
    );
}