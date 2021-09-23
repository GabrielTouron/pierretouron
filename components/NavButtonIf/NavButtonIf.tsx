import { Button, ButtonProps, useColorModeValue } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

interface Props {
  ifHomeBtn: boolean
  children: string | ReactElement
  onClick: VoidFunction
}

export const NavButton: React.FC<Props> = ({
  ifHomeBtn,
  children,
  onClick,
}: Props) => {
  const navButtonColor = useColorModeValue('blackAlpha', 'white')

  const baseNavButtonProps: ButtonProps = {
    variant: 'ghost',
    colorScheme: navButtonColor,
    onClick,
  }

  if (ifHomeBtn) {
    return (
      <Button size="lg" fontWeight="bold" {...baseNavButtonProps}>
        {children}
      </Button>
    )
  }

  return (
    <Button size="md" {...baseNavButtonProps}>
      {children}
    </Button>
  )
}
