import { useState } from 'react';
import NextLink from 'next/link';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { AppBar, Avatar, Badge, Box, IconButton, Toolbar, Tooltip, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

import { Bell as BellIcon } from '~/icons/bell';
import { UserCircle as UserCircleIcon } from '~/icons/user-circle';
import { Users as UsersIcon } from '~/icons/users';

import { useAuth } from '~/hooks/useAuth';

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
	backgroundColor: theme.palette.background.paper,
	boxShadow: theme.shadows[3]
}));

export const DashboardNavbar = (props) => {
	const { onSidebarOpen, ...other } = props;
	const [anchorEl, setAnchorEl] = useState(null);
	const { session, signOut } = useAuth();

	const handleMenu = (e) => {
		setAnchorEl(e.currentTarget);
	}

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<DashboardNavbarRoot
				sx={{
					left: {
						lg: 280
					},
					width: {
						lg: 'calc(100% - 280px)'
					}
				}}
				{...other}>
				<Toolbar
					disableGutters
					sx={{
						minHeight: 64,
						left: 0,
						px: 2
					}}
				>
					<IconButton
						onClick={onSidebarOpen}
						sx={{
							display: {
								xs: 'inline-flex',
								lg: 'none'
							}
						}}
					>
						<MenuIcon fontSize="small" />
					</IconButton>
					<Box sx={{ flexGrow: 1 }} />
					{/* <Tooltip title="Contacts">
						<IconButton sx={{ ml: 1 }}>
							<UsersIcon fontSize="small" />
						</IconButton>
					</Tooltip>
					<Tooltip title="Notifications">
						<IconButton sx={{ ml: 1 }}>
							<Badge
								badgeContent={4}
								color="primary"
								variant="dot"
							>
								<BellIcon fontSize="small" />
							</Badge>
						</IconButton>
					</Tooltip> */}
					<div>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleMenu}
							color="inherit"
						>
							<Avatar
								sx={{
									height: 40,
									width: 40,
									ml: 1
								}}
								src={''}
							>
								{session ?
									session.user.firstName[0].toUpperCase() + session.user.lastName[0].toUpperCase()
									:
									<UserCircleIcon fontSize="small" />
								}
							</Avatar>
						</IconButton>
							<Menu
								id="menu-appbar"
								anchorEl={anchorEl}
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'right',

								}}
								open={Boolean(anchorEl)}
								onClose={handleClose}
							>
								{
									session ? 
									<><MenuItem onClick={handleClose}>
									<NextLink
										href="/account"
										passHref
									>
										<span>My account</span>
									</NextLink>
								</MenuItem>
								<MenuItem onClick={() => { handleClose();signOut(); }}>Log out</MenuItem>
									</>
									: <MenuItem onClick={handleClose}>
									<NextLink
										href="/auth/login"
										passHref
									>
										<span>Log in</span>
									</NextLink>
								</MenuItem>
								}
								
							</Menu>
					</div>
				</Toolbar>
			</DashboardNavbarRoot>
		</>
	);
};

DashboardNavbar.propTypes = {
	onSidebarOpen: PropTypes.func
};
