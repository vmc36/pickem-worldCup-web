import { createBrowserRouter } from 'react-router-dom'

import { AuthGuard } from '~/components'
import {
  HunchesScreen,
  LoginScreen,
  OnBoardingScreen,
  LeaderboardScreen,
  SignUpScreen
} from '~/screens'

const routes = [
  {
    path: '/',
    element: <AuthGuard element={<OnBoardingScreen />} />
  },
  {
    path: '/auth/signin',
    element: <AuthGuard element={<LoginScreen />} />
  },
  {
    path: '/auth/signup',
    element: <AuthGuard element={<SignUpScreen />} />
  },
  {
    path: '/dashboard',
    element: <AuthGuard element={<HunchesScreen />} isProtectedRoute={true} />
  },
  {
    path: '/leaderboard',
    element: <AuthGuard element={<LeaderboardScreen />} isProtectedRoute={true} />
  },
  {
    path: '/u/:username',
    element: <HunchesScreen />
  },
]

export const router = createBrowserRouter(routes)