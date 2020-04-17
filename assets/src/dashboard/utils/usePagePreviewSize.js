/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * External dependencies
 */
import { useCallback, useEffect, useState } from 'react';
/**
 * Internal dependencies
 */
import theme from '../theme';
import { PAGE_RATIO } from '../constants';

export default function usePagePreviewSize(options = {}) {
  const { thumbnailMode = false } = options;
  const baseSize = thumbnailMode ? 33 : 100;
  const [pageSize, setPageSize] = useState({
    width: baseSize,
    height: PAGE_RATIO * baseSize,
  });
  const handleWindowResize = useCallback(() => {
    const { innerWidth } = window;
    let itemWidth = 0;

    if (innerWidth <= theme.breakpoint.raw.min) {
      itemWidth = theme.previewWidth.min;
    } else if (innerWidth <= theme.breakpoint.raw.smallDisplayPhone) {
      itemWidth = theme.previewWidth.smallDisplayPhone;
    } else if (innerWidth <= theme.breakpoint.raw.largeDisplayPhone) {
      itemWidth = theme.previewWidth.largeDisplayPhone;
    } else if (innerWidth <= theme.breakpoint.raw.tablet) {
      itemWidth = theme.previewWidth.tablet;
    } else {
      itemWidth = theme.previewWidth.desktop;
    }
    setPageSize({
      width: itemWidth,
      height: itemWidth * PAGE_RATIO,
    });
  }, []);

  useEffect(() => {
    if (thumbnailMode) {
      setPageSize({
        width: baseSize,
        height: PAGE_RATIO * baseSize,
      });
      return () => {};
    }
    window.addEventListener('resize', handleWindowResize);
    handleWindowResize();
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [baseSize, handleWindowResize, thumbnailMode]);

  return { pageSize };
}