/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import type Nullable from '../common/Nullable'
import type Bounding from '../common/Bounding'
import type { KLineData } from '../common/Data'
import type Precision from '../common/Precision'
import type Crosshair from '../common/Crosshair'
import type {
  CandleStyle, TooltipLegend, TooltipLegendChild,
  CandleTooltipCustomCallbackData, CandleTooltipRectStyle,
} from "../common/Styles";
import {
  TooltipShowType, CandleTooltipRectPosition, PolygonType,
} from "../common/Styles";
import { formatPrecision } from '../common/utils/format'
import { createFont } from '../common/utils/canvas'
import { isFunction, isObject, isValid } from '../common/utils/typeChecks'

import { FormatDateType, type Options } from '../Options'

import { PaneIdConstants } from '../pane/types'

import type Coordinate from '../common/Coordinate'
import type Indicator from '../component/Indicator'
import { AxisPosition } from '../component/Axis'

import IndicatorTooltipView from './IndicatorTooltipView'

import type { TooltipIcon } from '../Store'

import { i18n } from '../extension/i18n/index'

export default class CandleTooltipView extends IndicatorTooltipView {
  override drawImp (ctx: CanvasRenderingContext2D): void {
    const widget = this.getWidget()
    const pane = widget.getPane()
    const paneId = pane.getId()
    const chartStore = pane.getChart().getChartStore()
    const crosshair = chartStore.getCrosshair()
    if (isValid(crosshair.kLineData)) {
      const bounding = widget.getBounding()
      const yAxisBounding = pane.getYAxisWidget()!.getBounding()
      const dataList = chartStore.getDataList()
      const precision = chartStore.getPrecision()
      const options = chartStore.getOptions()
      const activeIcon = chartStore.getActiveTooltipIcon()
      const indicators = chartStore.getIndicatorsByPaneId(pane.getId())
      const candleStyles = options.styles.candle
      const indicatorStyles = options.styles.indicator
      const tooltipRectStyles = candleStyles.tooltip.rect
      if (
        candleStyles.tooltip.showType === TooltipShowType.Rect &&
        indicatorStyles.tooltip.showType === TooltipShowType.Rect
      ) {
        const isDrawCandleTooltip = this.isDrawTooltip(crosshair, candleStyles.tooltip)
        const isDrawIndicatorTooltip = this.isDrawTooltip(crosshair, indicatorStyles.tooltip)
        this._drawRectTooltip(
          ctx, dataList, indicators,
          bounding, yAxisBounding,
          crosshair, precision, options,
          isDrawCandleTooltip, isDrawIndicatorTooltip,
          candleStyles.tooltip.offsetTop
        )
      } else if (
        candleStyles.tooltip.showType === TooltipShowType.Standard &&
        indicatorStyles.tooltip.showType === TooltipShowType.Standard
      ) {
        const { offsetLeft, offsetTop, offsetRight } = candleStyles.tooltip
        const maxWidth = bounding.width - offsetRight
        const top = this._drawCandleStandardTooltip(
          ctx, dataList, paneId, crosshair, activeIcon, precision,
          options, offsetLeft, offsetTop, maxWidth, candleStyles, tooltipRectStyles
        )
        this.drawIndicatorTooltip(
          ctx, paneId, dataList, crosshair,
          activeIcon, indicators, options,
          offsetLeft, top, maxWidth, indicatorStyles, tooltipRectStyles
        )
      } else if (
        candleStyles.tooltip.showType === TooltipShowType.Rect &&
        indicatorStyles.tooltip.showType === TooltipShowType.Standard
      ) {
        const { offsetLeft, offsetTop, offsetRight } = candleStyles.tooltip
        const maxWidth = bounding.width - offsetRight
        const top = this.drawIndicatorTooltip(
          ctx, paneId, dataList, crosshair,
          activeIcon, indicators, options,
          offsetLeft, offsetTop, maxWidth, indicatorStyles, tooltipRectStyles
        )
        const isDrawCandleTooltip = this.isDrawTooltip(crosshair, candleStyles.tooltip)
        this._drawRectTooltip(
          ctx, dataList, indicators,
          bounding, yAxisBounding, crosshair, precision,
          options, isDrawCandleTooltip, false, top
        )
      } else {
        const { offsetLeft, offsetTop, offsetRight } = candleStyles.tooltip
        const maxWidth = bounding.width - offsetRight
        const top = this._drawCandleStandardTooltip(
          ctx, dataList, paneId, crosshair, activeIcon, precision,
          options, offsetLeft, offsetTop, maxWidth, candleStyles, tooltipRectStyles
        )
        const isDrawIndicatorTooltip = this.isDrawTooltip(crosshair, indicatorStyles.tooltip)
        this._drawRectTooltip(
          ctx, dataList, indicators, bounding,
          yAxisBounding, crosshair, precision,
          options, false, isDrawIndicatorTooltip, top
        )
      }
    }
  }

  private _drawCandleStandardTooltip (
    ctx: CanvasRenderingContext2D,
    dataList: KLineData[],
    paneId: string,
    crosshair: Crosshair,
    activeTooltipIcon: Nullable<TooltipIcon>,
    precision: Precision,
    options: Options,
    left: number,
    top: number,
    maxWidth: number,
    styles: CandleStyle,
    rectStyles: CandleTooltipRectStyle
  ): number {
    const tooltipStyles = styles.tooltip
    const tooltipTextStyles = tooltipStyles.text
    let prevRowHeight = 0
    const coordinate = { x: left, y: top }
    if (this.isDrawTooltip(crosshair, tooltipStyles)) {
      const dataIndex = crosshair.dataIndex ?? 0
      const legends = this._getCandleTooltipLegends(
        { prev: dataList[dataIndex - 1] ?? null, current: crosshair.kLineData!, next: dataList[dataIndex + 1] ?? null },
        precision, options, styles
      )

      const [leftIcons, middleIcons, rightIcons] = this.classifyTooltipIcons(tooltipStyles.icons)

      const [measureResult, prevCalcHeight] = this.drawStandardTooltipRect(ctx, leftIcons, '', middleIcons, legends, rightIcons, coordinate, maxWidth, tooltipTextStyles, rectStyles)

      this.drawStandardTooltipIcons(
        ctx, activeTooltipIcon, leftIcons, 
        paneId, '', measureResult[0] as Coordinate[]
      )

      this.drawStandardTooltipIcons(
        ctx, activeTooltipIcon, middleIcons,
        paneId, '', measureResult[2] as Coordinate[]
      )

      if (legends.length > 0) {
         this.drawStandardTooltipLegends(
          ctx, legends, tooltipTextStyles,
          measureResult[3] as Array<[Coordinate, Coordinate]>
        )
      }

      this.drawStandardTooltipIcons(
        ctx, activeTooltipIcon, rightIcons,
        paneId, '', measureResult[4] as Coordinate[]
      )

      prevRowHeight = prevCalcHeight;
    }
    return coordinate.y + prevRowHeight
  }

  private _drawRectTooltip (
    ctx: CanvasRenderingContext2D,
    dataList: KLineData[],
    indicators: Indicator[],
    bounding: Bounding,
    yAxisBounding: Bounding,
    crosshair: Crosshair,
    precision: Precision,
    options: Options,
    isDrawCandleTooltip: boolean,
    isDrawIndicatorTooltip: boolean,
    top: number
  ): void {
    const candleStyles = options.styles.candle
    const indicatorStyles = options.styles.indicator
    const candleTooltipStyles = candleStyles.tooltip
    const indicatorTooltipStyles = indicatorStyles.tooltip
    if (isDrawCandleTooltip || isDrawIndicatorTooltip) {
      const dataIndex = crosshair.dataIndex ?? 0
      const candleLegends = this._getCandleTooltipLegends(
        { prev: dataList[dataIndex - 1] ?? null, current: crosshair.kLineData!, next: dataList[dataIndex + 1] ?? null },
        precision, options, candleStyles
      )

      const { offsetLeft, offsetTop, offsetRight, offsetBottom } = candleTooltipStyles

      const {
        marginLeft: baseTextMarginLeft,
        marginRight: baseTextMarginRight,
        marginTop: baseTextMarginTop,
        marginBottom: baseTextMarginBottom,
        size: baseTextSize,
        weight: baseTextWeight,
        family: baseTextFamily
      } = candleTooltipStyles.text

      const {
        position: rectPosition,
        paddingLeft: rectPaddingLeft,
        paddingRight: rectPaddingRight,
        paddingTop: rectPaddingTop,
        paddingBottom: rectPaddingBottom,
        offsetLeft: rectOffsetLeft,
        offsetRight: rectOffsetRight,
        offsetTop: rectOffsetTop,
        offsetBottom: rectOffsetBottom,
        borderSize: rectBorderSize,
        borderRadius: rectBorderRadius,
        borderColor: rectBorderColor,
        color: rectBackgroundColor
      } = candleTooltipStyles.rect

      let maxTextWidth = 0
      let rectWidth = 0
      let rectHeight = 0
      if (isDrawCandleTooltip) {
        ctx.font = createFont(baseTextSize, baseTextWeight, baseTextFamily)
        candleLegends.forEach(data => {
          const title = data.title as TooltipLegendChild
          const value = data.value as TooltipLegendChild
          const text = `${title.text}${value.text}`
          const labelWidth = ctx.measureText(text).width + baseTextMarginLeft + baseTextMarginRight
          maxTextWidth = Math.max(maxTextWidth, labelWidth)
        })
        rectHeight += ((baseTextMarginBottom + baseTextMarginTop + baseTextSize) * candleLegends.length)
      }

      const {
        marginLeft: indicatorTextMarginLeft,
        marginRight: indicatorTextMarginRight,
        marginTop: indicatorTextMarginTop,
        marginBottom: indicatorTextMarginBottom,
        size: indicatorTextSize,
        weight: indicatorTextWeight,
        family: indicatorTextFamily
      } = indicatorTooltipStyles.text
      const indicatorLegendsArray: TooltipLegend[][] = []
      if (isDrawIndicatorTooltip) {
        ctx.font = createFont(indicatorTextSize, indicatorTextWeight, indicatorTextFamily)
        indicators.forEach(indicator => {
          const tooltipDataLegends = this.getIndicatorTooltipData(dataList, crosshair, indicator, options, indicatorStyles).legends
          indicatorLegendsArray.push(tooltipDataLegends)
          tooltipDataLegends.forEach(data => {
            const title = data.title as TooltipLegendChild
            const value = data.value as TooltipLegendChild
            const text = `${title.text}${value.text}`
            const textWidth = ctx.measureText(text).width + indicatorTextMarginLeft + indicatorTextMarginRight
            maxTextWidth = Math.max(maxTextWidth, textWidth)
            rectHeight += (indicatorTextMarginTop + indicatorTextMarginBottom + indicatorTextSize)
          })
        })
      }
      rectWidth += maxTextWidth
      if (rectWidth !== 0 && rectHeight !== 0) {
        rectWidth += (rectBorderSize * 2 + rectPaddingLeft + rectPaddingRight)
        rectHeight += (rectBorderSize * 2 + rectPaddingTop + rectPaddingBottom)
        const centerX = bounding.width / 2
        const isPointer = rectPosition === CandleTooltipRectPosition.Pointer && crosshair.paneId === PaneIdConstants.CANDLE
        const isLeft = (crosshair.realX ?? 0) > centerX
        let rectX = 0
        if (isPointer) {
          const realX = crosshair.realX!
          if (isLeft) {
            rectX = realX - rectOffsetRight - rectWidth
          } else {
            rectX = realX + rectOffsetLeft
          }
        } else {
          const yAxis = this.getWidget().getPane().getAxisComponent()
          if (isLeft) {
            rectX = rectOffsetLeft + offsetLeft
            if (yAxis.inside && yAxis.position === AxisPosition.Left) {
              rectX += yAxisBounding.width
            }
          } else {
            rectX = bounding.width - rectOffsetRight - rectWidth - offsetRight
            if (yAxis.inside && yAxis.position === AxisPosition.Right) {
              rectX -= yAxisBounding.width
            }
          }
        }

        let rectY = top + rectOffsetTop
        if (isPointer) {
          const y = crosshair.y!
          rectY = y - rectHeight / 2
          if (rectY + rectHeight > bounding.height - rectOffsetBottom - offsetBottom) {
            rectY = bounding.height - rectOffsetBottom - rectHeight - offsetBottom
          }
          if (rectY < top + rectOffsetTop) {
            rectY = top + rectOffsetTop + offsetTop
          }
        }
        this.createFigure({
          name: 'rect',
          attrs: {
            x: rectX,
            y: rectY,
            width: rectWidth,
            height: rectHeight
          },
          styles: {
            style: PolygonType.StrokeFill,
            color: rectBackgroundColor,
            borderColor: rectBorderColor,
            borderSize: rectBorderSize,
            borderRadius: rectBorderRadius
          }
        })?.draw(ctx)
        const candleTextX = rectX + rectBorderSize + rectPaddingLeft + baseTextMarginLeft
        let textY = rectY + rectBorderSize + rectPaddingTop
        if (isDrawCandleTooltip) {
          // render candle texts
          candleLegends.forEach(data => {
            textY += baseTextMarginTop
            const title = data.title as TooltipLegendChild
            this.createFigure({
              name: 'text',
              attrs: {
                x: candleTextX,
                y: textY,
                text: title.text
              },
              styles: {
                color: title.color,
                size: baseTextSize,
                family: baseTextFamily,
                weight: baseTextWeight
              }
            })?.draw(ctx)
            const value = data.value as TooltipLegendChild
            this.createFigure({
              name: 'text',
              attrs: {
                x: rectX + rectWidth - rectBorderSize - baseTextMarginRight - rectPaddingRight,
                y: textY,
                text: value.text,
                align: 'right'
              },
              styles: {
                color: value.color,
                size: baseTextSize,
                family: baseTextFamily,
                weight: baseTextWeight
              }
            })?.draw(ctx)
            textY += (baseTextSize + baseTextMarginBottom)
          })
        }
        if (isDrawIndicatorTooltip) {
          // render indicator texts
          const indicatorTextX = rectX + rectBorderSize + rectPaddingLeft + indicatorTextMarginLeft
          indicatorLegendsArray.forEach(legends => {
            legends.forEach(data => {
              textY += indicatorTextMarginTop
              const title = data.title as TooltipLegendChild
              const value = data.value as TooltipLegendChild
              this.createFigure({
                name: 'text',
                attrs: {
                  x: indicatorTextX,
                  y: textY,
                  text: title.text
                },
                styles: {
                  color: title.color,
                  size: indicatorTextSize,
                  family: indicatorTextFamily,
                  weight: indicatorTextWeight
                }
              })?.draw(ctx)

              this.createFigure({
                name: 'text',
                attrs: {
                  x: rectX + rectWidth - rectBorderSize - indicatorTextMarginRight - rectPaddingRight,
                  y: textY,
                  text: value.text,
                  align: 'right'
                },
                styles: {
                  color: value.color,
                  size: indicatorTextSize,
                  family: indicatorTextFamily,
                  weight: indicatorTextWeight
                }
              })?.draw(ctx)
              textY += (indicatorTextSize + indicatorTextMarginBottom)
            })
          })
        }
      }
    }
  }

  private _getCandleTooltipLegends (
    data: CandleTooltipCustomCallbackData,
    precision: Precision,
    options: Options,
    styles: CandleStyle
  ): TooltipLegend[] {
    const { customApi, decimalFold, thousandsSeparator, locale } = options
    const tooltipStyles = styles.tooltip
    const textColor = tooltipStyles.text.color
    const current = data.current
    const prevClose = data.prev?.close ?? current.close
    const changeValue = current.close - prevClose
    const { price: pricePrecision, volume: volumePrecision } = precision
    const mapping = {
      '{time}': customApi.formatDate(current.timestamp, 'YYYY-MM-DD HH:mm', FormatDateType.Tooltip),
      '{open}': decimalFold.format(thousandsSeparator.format(formatPrecision(current.open, pricePrecision))),
      '{high}': decimalFold.format(thousandsSeparator.format(formatPrecision(current.high, pricePrecision))),
      '{low}': decimalFold.format(thousandsSeparator.format(formatPrecision(current.low, pricePrecision))),
      '{close}': decimalFold.format(thousandsSeparator.format(formatPrecision(current.close, pricePrecision))),
      '{volume}': decimalFold.format(thousandsSeparator.format(
        customApi.formatBigNumber(formatPrecision(current.volume ?? tooltipStyles.defaultValue, volumePrecision))
      )),
      '{turnover}': decimalFold.format(thousandsSeparator.format(
        formatPrecision(current.turnover ?? tooltipStyles.defaultValue, pricePrecision)
      )),
      '{change}': prevClose === 0 ? tooltipStyles.defaultValue : `${thousandsSeparator.format(formatPrecision(changeValue / prevClose * 100))}%`
    }
    const legends = (
      isFunction(tooltipStyles.custom)
        ? tooltipStyles.custom(data, styles)
        : tooltipStyles.custom
    )
    return legends.map(({ title, value }) => {
      let t: TooltipLegendChild = { text: '', color: '' }
      if (isObject(title)) {
        t = { ...title }
      } else {
        t.text = title
        t.color = textColor
      }
      t.text = i18n(t.text, locale)
      let v: TooltipLegendChild = { text: tooltipStyles.defaultValue, color: '' }
      if (isObject(value)) {
        v = { ...value }
      } else {
        v.text = value
        v.color = textColor
      }
      const match = v.text.match(/{(\S*)}/)
      if (match !== null && match.length > 1) {
        const key = `{${match[1]}}`
        v.text = v.text.replace(key, (mapping[key] ?? tooltipStyles.defaultValue) as string)
        if (key === '{change}') {
          v.color = changeValue === 0 ? styles.priceMark.last.noChangeColor : (changeValue > 0 ? styles.priceMark.last.upColor : styles.priceMark.last.downColor)
        }
      }
      return { title: t, value: v }
    })
  }
}
