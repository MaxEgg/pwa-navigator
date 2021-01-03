import {
  ComponentType,
  ReactElement,
  RefObject,
  ForwardRefExoticComponent,
  RefAttributes,
  ReactNode
} from 'react'

export type childrenTransition = 'slide' | 'stack'
export type RouteComponent = ForwardRefExoticComponent<
  IRoute & RefAttributes<HTMLDivElement>
>

export interface INavigator {
  children: ReactElement<IRoute> | ReactElement<IRoute>[]
  childrenTransition?: childrenTransition
  parent?: string
}

export interface IRouteComponent {
  params?: { [key: string]: string }
  toParent?: () => void
}

export interface IRoute {
  url: string
  childrenTransition?: childrenTransition
  component: ComponentType<IRouteComponent>
  children?: ReactElement<IRoute> | ReactElement<IRoute>[]
  params?: { [key: string]: string }
  isActive: boolean
}

export type RouteChild = {
  ref: any
} & IRoute

export type RouteDic = { url: string; ref: RefObject<HTMLDivElement> }[]

export interface IRouteProvider {
  children: ReactNode
}

export type setPath = (path: string) => void

export interface ILink {
  children: ReactNode
  to: string
  className?: string
  activeClassName?: string
  isActive?: (path: string) => boolean
}
