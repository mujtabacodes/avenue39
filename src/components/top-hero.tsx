import React from 'react';
import Container from './ui/Container';
import {
  Breadcrumb,
  BreadcrumbItem as BreadcrumbComponentItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { BsSlash } from 'react-icons/bs';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface TopHeroProps {
  title?: string;
  category?: string;
  breadcrumbs: BreadcrumbItem[];
  categoryName?: string | undefined;
  subCategorName?: string | undefined;
}

const TopHero: React.FC<TopHeroProps> = ({
  title,
  breadcrumbs,
  category,
  categoryName,
  subCategorName,
}) => {
  return (
    <div className="bg-[#F6F6F6]">
      <Container className="text-center min-h-14 flex justify-center pt-1 flex-col">
        {title && <p className="text-[36px] font-medium">{title}</p>}
        <Breadcrumb
          className={`flex ${title ? 'justify-center text-[16px] pt-3' : 'justify-start items-center text-[20px] font-semibold'}`}
        >
          <BreadcrumbList>
            {breadcrumbs.map((breadcrumb, index) => (
              <React.Fragment key={index}>
                <BreadcrumbComponentItem className="flex items-center sm:gap-1">
                  {breadcrumb.href ? (
                    <BreadcrumbLink
                      className="text-14 font-medium text-[#959595]"
                      href={breadcrumb.href}
                    >
                      {breadcrumb.label}
                    </BreadcrumbLink>
                  ) : categoryName ? (
                    <>
                      <BreadcrumbSeparator>
                        <BsSlash />
                      </BreadcrumbSeparator>
                      {subCategorName ? (
                        <BreadcrumbLink
                          className={`text-14 font-medium text-[#959595]`}
                          href={`/products/${categoryName.replaceAll(' ', '-').toLowerCase()}`}
                        >
                          {categoryName}
                        </BreadcrumbLink>
                      ) : (
                        <BreadcrumbPage className="text-14 font-semibold text-black">
                          {categoryName}
                        </BreadcrumbPage>
                      )}

                      {subCategorName ? (
                        <>
                          {' '}
                          <BreadcrumbSeparator>
                            <BsSlash />
                          </BreadcrumbSeparator>
                          <BreadcrumbPage className="text-14 font-semibold text-black">
                            {subCategorName.replace('SUB_', '')}
                          </BreadcrumbPage>
                        </>
                      ) : (
                        ''
                      )}
                    </>
                  ) : (
                    <BreadcrumbPage className="text-14 font-semibold text-black capitalize">
                      {breadcrumb.label}
                    </BreadcrumbPage>
                  )}
                </BreadcrumbComponentItem>
                {index < breadcrumbs.length - 1 && !categoryName && (
                  <BreadcrumbSeparator>
                    <BsSlash />
                  </BreadcrumbSeparator>
                )}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
        <div
          className={`flex mt-3 ${category ? 'justify-start ' : 'justify-start font-semibold'}`}
        >
          {category && <p className="text-[21px] font-medium">{category}</p>}
        </div>
      </Container>
    </div>
  );
};

export default TopHero;
