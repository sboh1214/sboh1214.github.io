import React, { useState, useLayoutEffect } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import { makeStyles, Theme, createStyles, useTheme } from '@material-ui/core/styles'
import Footer from './Footer'
import ThemeContextProvider from './ThemeContext'
import 'fontsource-roboto/index.css'
import DrawerInner from './DrawerInner'
import SearchAppBar from './SearchAppBar'

const drawerWidth = 240
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex'
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0
      }
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3)
    }
  })
)

export default function Layout({ children }: any) {
  const classes = useStyles()
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [container, setContainer] = useState<any>(undefined)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  useLayoutEffect(() => {
    setContainer(window !== undefined ? window.document.body : undefined)
  }, [])

  return (
    <ThemeContextProvider>
      <div className={classes.root}>
        <CssBaseline />
        <SearchAppBar drawerWidth={drawerWidth} onMenuClick={handleDrawerToggle} />
        <nav className={classes.drawer} aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper
              }}
              ModalProps={{
                keepMounted: true // Better open performance on mobile.
              }}
            >
              <DrawerInner />
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper
              }}
              variant="permanent"
              open
            >
              <DrawerInner />
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <article>{children}</article>
          <footer>
            <Footer />
          </footer>
        </main>
      </div>
    </ThemeContextProvider>
  )
}
