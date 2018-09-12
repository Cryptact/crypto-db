# -*- coding: utf-8 -*-
"""crypto-db
Copyright(C) 2018 Cryptact,LTD.
"""
from setuptools import setup, find_packages

setup(
    name='crypto-db',
    version='1.0.0',
    description='Scripts for crypto-db',
    url='https://github.com/cryptact/crypto-db',
    author='Shunsuke Masuda',
    license='MIT',
    classifiers=[
        'Programming Language :: Python :: 3.6'],
    packages=find_packages(exclude=['dev']),
    python_requires='>=3.6.3',
    extras_require={'dev': ['pytest']},
)
