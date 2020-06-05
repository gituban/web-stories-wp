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
import PropTypes from 'prop-types';
import { useCallback, useMemo, useState } from 'react';

/**
 * Internal dependencies
 */
import { useInsertElement } from '../canvas';
import isPointerClickEvent from '../../utils/isPointerClickEvent';
import Context from './context';

const MEDIA = 'media';
const TEXT = 'text';
const SHAPES = 'shapes';
const ELEMENTS = 'elements';
const ANIMATION = 'animation';

const TABS = {
  MEDIA,
  TEXT,
  SHAPES,
  ELEMENTS,
  ANIMATION,
};

function LibraryProvider({ children }) {
  const [tab, setTabState] = useState(MEDIA);
  const insertElement = useInsertElement();

  const setTab = useCallback((tabId, evt) => {
    setTabState(tabId);
    if (evt && isPointerClickEvent(evt)) {
      evt.currentTarget.blur();
    }
  }, []);

  const state = useMemo(
    () => ({
      state: {
        tab,
      },
      actions: {
        setTab,
        insertElement,
      },
      data: {
        tabs: TABS,
      },
    }),
    [tab, insertElement, setTab]
  );

  return <Context.Provider value={state}>{children}</Context.Provider>;
}

LibraryProvider.propTypes = {
  children: PropTypes.node,
};

export default LibraryProvider;
