import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

export default function CustomModal({ titulo, text, cargar, onChange, recargarPagina }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isRecargarPagina, setIsRecargarPagina] = useState(recargarPagina == "recargar");
    useEffect(() => {
        if (cargar) {
            onOpen();
        } else {
            onClose();
        }
    }, [cargar]);

    const alCerrar = () => {
        if (isRecargarPagina) {
            window.location.reload();
        }else if (recargarPagina != false ){
            window.location.href= recargarPagina;
        }
        onClose();
        onChange(false);
    }

    return (
        <>

            <Modal backdrop="blur" isOpen={isOpen} onClose={alCerrar} >
                <ModalContent>
                    <>
                        <ModalHeader className="flex flex-col gap-1">{titulo}</ModalHeader>
                        <ModalBody>
                            {
                                text.map((linea, index) => (
                                    <p key={index}>
                                        {linea}
                                    </p>
                                ))
                            }
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onPress={alCerrar}>
                                De acuerdo
                            </Button>
                        </ModalFooter>
                    </>

                </ModalContent>
            </Modal>
        </>
    );
}

