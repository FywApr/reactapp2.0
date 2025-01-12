import { Box, Modal } from '@mui/material';
import  { FC, PropsWithChildren, createContext, useContext, useState } from 'react';
import { Typography } from '../ui/Typography';
import { Button } from '../ui/Button';
import { COLORS_BACKGROUND } from '../ui/colors';

interface ModalOptions {
    title?: string;
    description?: string;

    closeButtonText?: string;
    onClose?: () => void;

    confirmButtonText?: string;
    onConfirm?: () => void;
} 

interface ContextValue {
    showModal: (options: ModalOptions) => void;
}

const ModalContext = createContext<ContextValue>({
    showModal: () => {},
});

const DefaultOptions: ModalOptions = {
    title: '',
    description: '',
    onClose: () => {},
}


export const useModalContext = () => useContext(ModalContext);

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "white",
    borderRadius: 4,
    boxShadow: 24,
    p: 2,
}

export const ModalProvider: FC<PropsWithChildren> = function ModalProvider(props) {
    const [show, setShow] = useState<boolean>(false);
    const [options, setOptions] = useState<ModalOptions>(DefaultOptions);

    const showModal = (options: ModalOptions) => {
        setShow(true);
        setOptions(options);
    };

    const handleClosePress = () => {
        options?.onClose?.();
        setShow(false)
    };
    
  return (
    <ModalContext.Provider value={{showModal}}>
        {props.children}
        <Modal
            open={show}
            onClose={() => {
                options?.onClose?.();
                setShow(false);
            }}
        >
        <Box sx={style}>
            <Typography weight={600} size={20} className='mb-2'>{options?.title}</Typography>
            <Typography className='mb-2'>{options?.description}</Typography>
            <div className={'flex'}>
                {Boolean(options.onConfirm) && (
                    <Button mode={'dark'} className={`mr-2 ${COLORS_BACKGROUND.error500}`}
                    onClick={() => {
                        options.onConfirm?.();
                        handleClosePress();
                    }}
                    >
                        {options.confirmButtonText ?? "Применить"}
                    </Button>
                )}
                <Button mode={'dark'} onClick={handleClosePress}>
                    {options.closeButtonText ?? "Закрыть"}
                </Button>
            </div>
        </Box>
        </Modal>
    </ModalContext.Provider>
  )
};