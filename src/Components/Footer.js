import { Box, Flex, Text, Link, useColorModeValue, Button } from '@chakra-ui/react'
import { useEffect } from 'react'

const Footer = () => {
  useEffect(() => {
    const handleInstallPrompt = e => {
      e.preventDefault()
      const installButton = document.getElementById('install-button')

      installButton.style.display = 'block'

      installButton.addEventListener('click', () => {
        e.prompt()
        installButton.style.display = 'none'
      })
    }

    window.addEventListener('beforeinstallprompt', handleInstallPrompt)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleInstallPrompt)
    }
  }, [])
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      position='fixed'
      bottom={0}
      left={0}
      right={0}
      textAlign='center'
      py={2}
      pl={5}
      pr={5}
      borderTop='1px solid'
		>
      <Flex
        alignItems='center'
        justifyContent='space-between'
        color='#888686'
        style={{
          whiteSpace: 'nowrap',
          fontSize: '12px',
          fontWeight: '400'
        }}
			>
        <Box>
          <span>Copyright © 2019</span>
          <span style={{ paddingLeft: '10px' }}>HodlInfo.com</span>
        </Box>
        <Button
          id='install-button'
          display='none'
          onClick={() => {
            const installButton = document.getElementById('install-button')
            installButton.style.display = 'none'
            const installEvent = new Event('beforeinstallprompt')
            window.dispatchEvent(installEvent)
          }}
				>
					Install App
				</Button>
        <Link
          href='mailto:support@hodlinfo.com'
          className='footer-text-link'
          textDecoration='underline'
          _hover={{
            textDecoration: 'none'
          }}
				>
					Support
				</Link>
      </Flex>
    </Box>
  )
}

export default Footer
